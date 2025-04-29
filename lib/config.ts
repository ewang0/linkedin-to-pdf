import { ProfileData } from "@/types";

export const LINKEDIN_URL = "https://www.linkedin.com/login";
export const SAMPLE_PROFILE_DATA: ProfileData = {
  name: "Jane Doe",
  headline: "Senior Software Engineer",
  profilePicture: "https://picsum.photos/id/64/200",
  experience: [
    {
      title: "Senior Software Engineer",
      companyInfo: "Tech Solutions Inc.",
      duration: "Jan 2020 - Present",
      location: "San Francisco, CA",
      descriptions: [
        "Led development of a microservices architecture that improved system reliability by 40%",
        "Mentored junior developers and conducted code reviews for team of 8 engineers",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
      ],
    },
    {
      title: "Software Engineer",
      companyInfo: "Digital Innovations",
      duration: "Jun 2017 - Dec 2019",
      location: "Seattle, WA",
      descriptions: [
        "Developed RESTful APIs for mobile applications with over 100k users",
        "Optimized database queries resulting in 30% performance improvement",
        "Collaborated with UX team to implement responsive design patterns",
      ],
    },
  ],
  education: [
    {
      schoolName: "University of Washington",
      degree: "Master of Science in Computer Science",
      year: "2017",
      description: "Specialized in Machine Learning and Distributed Systems",
    },
    {
      schoolName: "California State University",
      degree: "Bachelor of Science in Computer Science",
      year: "2015",
      description: "Graduated with honors, 3.8 GPA",
    },
  ],
};
export const SAMPLE_PROFILE_DATA_MINIMAL: ProfileData = {
  name: "Jane Smith",
  headline: "UX Designer",
  profilePicture: "https://picsum.photos/id/64/200",
  experience: [
    {
      title: "UX Designer",
      companyInfo: "Creative Designs Co.",
      duration: "2019 - Present",
      descriptions: [],
    },
  ],
  education: [
    {
      schoolName: "Design Institute",
      degree: "Bachelor of Arts in Design",
      year: "2019",
    },
  ],
};
export const TEST_PROFILE_DATA: ProfileData = {
  name: "Jane Doe",
  headline: "Software Engineer | React | TypeScript | Node.js",
  profilePicture: "",
  education: [
    {
      schoolName: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      year: "2013-2017",
      description: "Computer Science major with focus on web technologies",
    },
  ],
  experience: [
    {
      title: "Senior Software Engineer",
      companyInfo: "Tech Solutions Inc.",
      duration: "Jan 2020 - Present",
      location: "San Francisco, CA",
      descriptions: [
        "Lead frontend development for enterprise applications using React and TypeScript.",
        "Implemented CI/CD pipelines and improved test coverage by 40%",
      ],
    },
    {
      title: "Software Developer",
      companyInfo: "WebDev Agency",
      duration: "Jun 2017 - Dec 2019",
      location: "San Francisco, CA",
      descriptions: [
        "Developed responsive web applications for various clients.",
        "Collaborated with design team to implement pixel-perfect UIs",
      ],
    },
  ],
};
