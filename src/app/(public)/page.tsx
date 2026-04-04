import { connectDB } from "@/lib/mongodb";
import { About } from "@/models/About";
import { Project } from "@/models/Project";
import { Skill } from "@/models/Skill";
import { BlogPost } from "@/models/BlogPost";
import { HeroSection } from "@/components/public/HeroSection";
import { AboutSection } from "@/components/public/AboutSection";
import { ProjectsSection } from "@/components/public/ProjectsSection";
import { SkillsSection } from "@/components/public/SkillsSection";
import { BlogSection } from "@/components/public/BlogSection";
import { ContactSection } from "@/components/public/ContactSection";

export default async function HomePage() {
  await connectDB();

  const [about, featuredProjects, skills, recentPosts] = await Promise.all([
    About.findOne().lean(),
    Project.find({ featured: true, published: true })
      .sort({ order: 1 })
      .limit(6)
      .lean(),
    Skill.find().sort({ order: 1 }).lean(),
    BlogPost.find({ published: true })
      .sort({ publishedAt: -1 })
      .limit(3)
      .lean(),
  ]);

  const aboutData = about ? JSON.parse(JSON.stringify(about)) : null;
  const projectsData = featuredProjects
    ? JSON.parse(JSON.stringify(featuredProjects))
    : [];
  const skillsData = skills ? JSON.parse(JSON.stringify(skills)) : [];
  const postsData = recentPosts ? JSON.parse(JSON.stringify(recentPosts)) : [];

  return (
    <>
      <HeroSection about={aboutData} />
      <AboutSection about={aboutData} />
      <ProjectsSection projects={projectsData} />
      <SkillsSection skills={skillsData} />
      <BlogSection posts={postsData} />
      <ContactSection />
    </>
  );
}
