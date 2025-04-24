import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  contactInfo: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
  },
  experienceItem: {
    marginBottom: 15,
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  jobTitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  dates: {
    fontSize: 10,
    marginBottom: 5,
    color: "#666666",
  },
  description: {
    fontSize: 10,
    marginBottom: 5,
  },
  skillsSection: {
    marginTop: 15,
  },
  skillsList: {
    fontSize: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skill: {
    marginRight: 5,
    marginBottom: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

// Define types for the resume data
interface Education {
  school: string;
  degree: string;
  duration: string;
  description?: string;
}

interface Experience {
  title: string;
  companyInfo: string;
  duration: string;
  location?: string;
  descriptions: string[];
}

interface ResumeData {
  name?: string;
  headline?: string;
  email?: string;
  location?: string;
  summary?: string;
  profilePicture?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
  profileData?: ResumeData;
}

export const ResumePDF = ({ data }: { data: ResumeData }) => {
  const profileData = data.profileData || data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {profileData?.profilePicture && (
            <Image
              src={profileData.profilePicture}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.header}>{profileData?.name || "Full Name"}</Text>
          <Text style={styles.contactInfo}>
            {profileData?.headline || "Professional Title"}
            {profileData?.email && ` | ${profileData.email}`}
            {profileData?.location && ` | ${profileData.location}`}
          </Text>
        </View>

        {/* Summary Section - only if provided */}
        {profileData?.summary && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Summary</Text>
            <Text style={styles.description}>{profileData.summary}</Text>
          </View>
        )}

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.subheader}>Experience</Text>
          {profileData?.experience && profileData.experience.length > 0 ? (
            profileData.experience.map((exp: Experience, index: number) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.companyName}>{exp.companyInfo}</Text>
                <Text style={styles.jobTitle}>{exp.title}</Text>
                <Text style={styles.dates}>
                  {exp.duration}
                  {exp.location ? ` | ${exp.location}` : ""}
                </Text>
                {exp.descriptions &&
                  exp.descriptions.map((desc, i) => (
                    <Text key={i} style={styles.description}>
                      • {desc}
                    </Text>
                  ))}
              </View>
            ))
          ) : (
            <View style={styles.experienceItem}>
              <Text style={styles.companyName}>Company Name</Text>
              <Text style={styles.jobTitle}>Job Title</Text>
              <Text style={styles.dates}>Date Range</Text>
              <Text style={styles.description}>
                Job description and achievements
              </Text>
            </View>
          )}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.subheader}>Education</Text>
          {profileData?.education && profileData.education.length > 0 ? (
            profileData.education.map((edu: Education, index: number) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.companyName}>{edu.school}</Text>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.dates}>{edu.duration}</Text>
                {edu.description && (
                  <Text style={styles.description}>{edu.description}</Text>
                )}
              </View>
            ))
          ) : (
            <View style={styles.experienceItem}>
              <Text style={styles.companyName}>University Name</Text>
              <Text style={styles.jobTitle}>Degree</Text>
              <Text style={styles.dates}>Graduation Year</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

const ResumePDFViewer = ({ profileData }: { profileData: ResumeData }) => (
  <PDFViewer style={{ width: "100%", height: "100%", minHeight: "500px" }}>
    <ResumePDF data={profileData} />
  </PDFViewer>
);

export default ResumePDFViewer;
