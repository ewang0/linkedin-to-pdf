# LinkedIn Resume Generator

<img width="1466" alt="Screenshot 2025-04-24 at 8 03 14 PM" src="https://github.com/user-attachments/assets/10ca13ff-8979-4d38-9855-15c1cdabd359" />

A web application that allows users to authenticate with LinkedIn, scrape their profile information using Playwright, and generate a beautifully formatted PDF resume using [React-PDF](https://react-pdf.org/). Built with [Next.js](https://nextjs.org/).

## ✨ Features

- 🔐 **LinkedIn Authentication**  
  Users log in via LinkedIn to securely scrape their profile data.
- 🔎 **Profile Scraper**  
  Utilizes [Playwright](https://playwright.dev/) to extract work experience, education, and more from LinkedIn.
- 🧾 **PDF Resume Generation**  
  Generates a clean and printable PDF using React-PDF based on scraped profile information.
- 🎨 **Frontend Styling**  
  Polished UI built with React and styled using modern design principles.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Scraping**: [Playwright](https://playwright.dev/)
- **PDF Rendering**: [React-PDF](https://react-pdf.org/)
- **Authentication**: LinkedIn session-based login via Playwright
- **Styling**: Tailwind CSS or your preferred CSS framework

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/ewang0/linkedin-to-pdf.git
cd linkedin-to-pdf
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Run the scraper (Playwright)
Ensure Playwright is installed:
```bash
npx playwright install
```

The application guides users through logging into LinkedIn via a browser session.


## 🧪 Improvements & Future Iterations

- 🗄️ **Add Local DB (e.g. SQLite)**  
  Persist auth and user profile data locally to allow for re-generation and editing without re-scraping.
- 🧩 **Use Custom Hooks**  
  Encapsulate authentication and scraping logic into React hooks for cleaner, reusable code.
- 🔐 **Enhanced Auth Strategy**  
  If access is granted, switch to using the official LinkedIn API for a more secure and scalable solution.

## Example Resume

[linkedin-resume (19).pdf](https://github.com/user-attachments/files/19900626/linkedin-resume.19.pdf)
