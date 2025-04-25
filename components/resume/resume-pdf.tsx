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
import { ProfileData, Education, Experience } from "@/types";

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

export const ResumePDF = ({ profileData }: { profileData: ProfileData }) => {
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
          </Text>
        </View>

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
                <Text style={styles.companyName}>{edu.schoolName}</Text>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.dates}>{edu.year}</Text>
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

const ResumePDFViewer = ({ profileData }: { profileData: ProfileData }) => (
  <PDFViewer style={{ width: "100%", height: "100%", minHeight: "500px" }}>
    <ResumePDF profileData={profileData} />
  </PDFViewer>
);

export default ResumePDFViewer;
