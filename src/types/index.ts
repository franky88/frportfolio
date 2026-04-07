export interface IProject {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  coverImage?: string;
  images?: string[];
  tags?: string[];
  category: "graphic-design" | "web-development";
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISkill {
  _id: string;
  name: string;
  category: "design" | "development" | "tools";
  proficiency?: number;
  icon?: string;
  order: number;
}

export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  published: boolean;
  publishedAt?: string;
  readTime?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface IAbout {
  _id: string;
  name: string;
  tagline?: string;
  bio: string;
  avatar?: string;
  location?: string;
  email?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    dribbble?: string;
  };
  resumeUrl?: string;
  heroHeadline?: string;
  heroSubtitle?: string;
}

export interface IResumeExperience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  bullets: string[];
}

export interface IResumeEducation {
  institution: string;
  degree: string;
  year: string;
}

export interface IResumeSection {
  label: string;
  items: string[];
}

export interface IResume {
  _id: string;
  name: string;
  title: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  summary: string;
  experience: IResumeExperience[];
  education: IResumeEducation[];
  skills: IResumeSection[];
  published: boolean;
  updatedAt: string;
}
