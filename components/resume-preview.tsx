import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data for the resume
const resumeData = {
  personalInfo: {
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    website: "alexjohnson.dev",
  },
  summary:
    "Results-driven software engineer with 8+ years of experience developing scalable web applications and leading engineering teams. Specialized in React, Node.js, and cloud architecture with a track record of delivering high-performance solutions that drive business growth.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      period: "Jan 2020 - Present",
      description:
        "Lead a team of 5 engineers developing cloud-native applications using React, Node.js, and AWS. Implemented CI/CD pipelines that reduced deployment time by 70%. Architected microservices that improved system scalability and reduced operational costs by 35%.",
      achievements: [
        "Redesigned authentication system, reducing login failures by 45%",
        "Led migration from monolith to microservices architecture",
        "Implemented automated testing strategy achieving 92% code coverage",
      ],
    },
    {
      title: "Software Engineer",
      company: "InnovateSoft",
      location: "Seattle, WA",
      period: "Mar 2017 - Dec 2019",
      description:
        "Developed and maintained full-stack web applications using React, Redux, and Express. Collaborated with product managers to define feature specifications and improve user experience.",
      achievements: [
        "Built real-time analytics dashboard used by 50+ enterprise clients",
        "Optimized database queries resulting in 60% faster page loads",
        "Mentored 3 junior developers who were promoted to mid-level roles",
      ],
    },
    {
      title: "Junior Developer",
      company: "WebSolutions LLC",
      location: "Portland, OR",
      period: "Jun 2015 - Feb 2017",
      description:
        "Contributed to front-end development using JavaScript, HTML, and CSS. Participated in code reviews and implemented responsive designs for mobile applications.",
      achievements: [
        "Developed responsive UI components used across multiple projects",
        "Reduced CSS bundle size by 40% through optimization techniques",
      ],
    },
  ],
  education: [
    {
      degree: "M.S. Computer Science",
      institution: "Stanford University",
      location: "Stanford, CA",
      period: "2013 - 2015",
      details: "Focus on Artificial Intelligence and Distributed Systems",
    },
    {
      degree: "B.S. Computer Science",
      institution: "University of Washington",
      location: "Seattle, WA",
      period: "2009 - 2013",
      details: "Minor in Mathematics. Dean's List all semesters.",
    },
  ],
  skills: [
    "JavaScript/TypeScript",
    "React",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "CI/CD",
    "System Design",
    "Agile Methodologies",
    "Team Leadership",
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022",
    },
    {
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      date: "2021",
    },
  ],
};

export function ResumePreview() {
  return (
    <div className="bg-white text-black p-6 sm:p-8 max-w-full overflow-auto shadow-sm">
      <div className="max-w-[850px] mx-auto">
        {/* Header / Personal Info */}
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {resumeData.personalInfo.name}
          </h1>
          <h2 className="text-lg sm:text-xl font-medium text-gray-700 mt-1">
            {resumeData.personalInfo.title}
          </h2>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
            <div>{resumeData.personalInfo.email}</div>
            <div>{resumeData.personalInfo.phone}</div>
            <div>{resumeData.personalInfo.location}</div>
            <div>{resumeData.personalInfo.linkedin}</div>
            {resumeData.personalInfo.website && (
              <div>{resumeData.personalInfo.website}</div>
            )}
          </div>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Professional Summary
          </h3>
          <Separator className="mb-3" />
          <p className="text-sm text-gray-700 leading-relaxed">
            {resumeData.summary}
          </p>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Experience
          </h3>
          <Separator className="mb-3" />
          <div className="space-y-5">
            {resumeData.experience.map((job, index) => (
              <div key={index} className="pb-2">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                  <h4 className="font-medium text-gray-900">{job.title}</h4>
                  <span className="text-sm text-gray-600">{job.period}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                  <div className="font-medium text-gray-700">
                    {job.company}, {job.location}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{job.description}</p>
                <ul className="list-disc list-inside text-sm text-gray-700 pl-1">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="mb-1">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Education
          </h3>
          <Separator className="mb-3" />
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                  <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                  <span className="text-sm text-gray-600">{edu.period}</span>
                </div>
                <div className="text-sm text-gray-700">
                  {edu.institution}, {edu.location}
                </div>
                {edu.details && (
                  <div className="text-sm text-gray-600 mt-1">
                    {edu.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>
          <Separator className="mb-3" />
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-gray-100 text-gray-800 font-normal"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Certifications
          </h3>
          <Separator className="mb-3" />
          <div className="space-y-2">
            {resumeData.certifications.map((cert, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between"
              >
                <div className="font-medium text-gray-900">{cert.name}</div>
                <div className="text-sm text-gray-600">
                  {cert.issuer}, {cert.date}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
