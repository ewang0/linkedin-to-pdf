export interface ProfileData {
  name: string;
  headline: string;
  profilePicture: string;
  education: Array<{
    schoolName: string;
    degree: string;
    year: string;
    description?: string;
  }>;
  experience: Array<{
    title: string;
    companyInfo: string;
    duration: string;
    location?: string;
    descriptions: string[];
  }>;
}

export interface Education {
  schoolName: string;
  degree: string;
  year: string;
  description?: string;
}

export interface Experience {
  title: string;
  companyInfo: string;
  duration: string;
  location?: string;
  descriptions: string[];
}
