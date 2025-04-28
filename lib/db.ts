import Database from "better-sqlite3";
import crypto from "crypto";
import fs from "fs";
import path from "path";

interface StoredCookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number; // Playwright uses seconds since epoch, -1 for session cookies
  httpOnly: boolean;
  secure: boolean;
  sameSite: "Strict" | "Lax" | "None";
}

const DB_PATH = process.env.DATABASE_PATH || "linkedin_session.db";
const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET; // Must be 32 bytes for aes-256-gcm

if (!ENCRYPTION_KEY || Buffer.from(ENCRYPTION_KEY, "hex").length !== 32) {
  console.error(
    "FATAL ERROR: ENCRYPTION_SECRET environment variable is missing or not a 32-byte hex string."
  );
  // create encryption secret with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  process.env.ENCRYPTION_SECRET = Buffer.alloc(32).toString("hex"); // Insecure default
  console.warn("Using insecure default encryption key. SET ENCRYPTION_SECRET!");
}

const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(DB_PATH);

// --- Initialization ---
db.exec(`
  CREATE TABLE IF NOT EXISTS session (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    encrypted_cookies TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Trigger to update 'updated_at' timestamp
db.exec(`
  CREATE TRIGGER IF NOT EXISTS update_session_updated_at
  AFTER UPDATE ON session
  FOR EACH ROW
  BEGIN
    UPDATE session SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
  END;
`);

console.log(`Database initialized at ${DB_PATH}`);

// --- Encryption/Decryption ---
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16; // For AES-GCM

function encrypt(text: string): string {
  const key = Buffer.from(process.env.ENCRYPTION_SECRET!, "hex");
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag();
  // Prepend IV and authTag to the encrypted data for storage
  return iv.toString("hex") + authTag.toString("hex") + encrypted;
}

function decrypt(encryptedData: string): string | null {
  try {
    const key = Buffer.from(process.env.ENCRYPTION_SECRET!, "hex");
    const iv = Buffer.from(encryptedData.substring(0, IV_LENGTH * 2), "hex");
    const authTag = Buffer.from(
      encryptedData.substring(IV_LENGTH * 2, IV_LENGTH * 2 + 32), // Auth tag is 16 bytes (32 hex chars) for AES-GCM
      "hex"
    );
    const encryptedText = encryptedData.substring(IV_LENGTH * 2 + 32);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    // This likely means the key changed or the data is corrupt/tampered
    return null;
  }
}

// --- Database Operations ---

/**
 * Saves the LinkedIn cookies securely. Assumes only one session is managed.
 * Replaces any existing session data.
 * @param cookies Array of Playwright Cookie objects.
 */
export function saveCookies(cookies: StoredCookie[]): void {
  // Filter out potentially problematic or unnecessary cookies if needed.
  const relevantCookies = cookies.filter(
    (c) => c.name && c.value && c.domain && c.path
  ); // Basic validation

  const cookiesString = JSON.stringify(relevantCookies);
  const encryptedCookies = encrypt(cookiesString);

  // Replace existing session (simple approach for single session)
  const deleteStmt = db.prepare("DELETE FROM session");
  const insertStmt = db.prepare(
    "INSERT INTO session (encrypted_cookies) VALUES (?)"
  );

  db.transaction(() => {
    deleteStmt.run();
    insertStmt.run(encryptedCookies);
  })();
  console.log("Cookies saved securely to database.");
}

/**
 * Retrieves and decrypts the stored LinkedIn cookies.
 * @returns Array of Playwright Cookie objects or null if none found or decryption fails.
 */
export function getCookies(): StoredCookie[] | null {
  const stmt = db.prepare(
    "SELECT encrypted_cookies FROM session ORDER BY updated_at DESC LIMIT 1"
  );
  const row = stmt.get() as { encrypted_cookies: string } | undefined;

  if (!row) {
    console.log("No session found in database.");
    return null;
  }

  const decryptedCookiesString = decrypt(row.encrypted_cookies);
  if (!decryptedCookiesString) {
    console.error("Failed to decrypt cookies from database.");
    return null;
  }

  try {
    const cookies = JSON.parse(decryptedCookiesString);
    // Basic validation of the parsed structure
    if (Array.isArray(cookies)) {
      console.log("Cookies retrieved and decrypted successfully.");
      // Filter out expired cookies before returning
      const nowSeconds = Date.now() / 1000;
      return cookies.filter(
        (c: StoredCookie) => c.expires === -1 || c.expires > nowSeconds
      );
    } else {
      throw new Error("Decrypted data is not an array");
    }
  } catch (error) {
    console.error("Failed to parse decrypted cookies:", error);
    return null;
  }
}

/**
 * Deletes the current session/cookies from the database.
 */
export function deleteSession(): void {
  const stmt = db.prepare("DELETE FROM session");
  const result = stmt.run();
  if (result.changes > 0) {
    console.log("Session deleted from database.");
  } else {
    console.log("No active session found to delete.");
  }
}

// Close the database connection on application exit
process.on("exit", () => {
  if (db && db.open) {
    db.close();
    console.log("Database connection closed.");
  }
});
process.on("SIGINT", () => process.exit()); // Handle Ctrl+C
