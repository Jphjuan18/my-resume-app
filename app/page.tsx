import Hero from "@/components/Hero";
import EducationAndSkills from "@/components/EducationAndSkills";
import Experience from "@/components/Experience";
import AwardsAndLeadership from "@/components/AwardsAndLeadership";
import Footer from "@/components/Footer";
import type { Metadata, ResolvingMetadata } from "next";

import {
  PrismaClient,
  Education,
  Skill,
  Experience as ExperienceType,
  Award,
  Leadership,
  Hero as HeroType,
} from "@prisma/client";

const prisma = new PrismaClient(); // Initialize Prisma Client

type ResumeData = {
  educations: Education[];
  skills: Skill[];
  experiences: ExperienceType[];
  awards: Award[];
  leadershipRoles: Leadership[];
  hero: HeroType | null;
};

// Include these imports at the top
let resumeCache: ResumeData | null = null;
const resumeCacheDuration = 1000 * 60 * 60 * 24; // 24-hour cache duration
let resumeLastCacheTime: number | null = null;

async function getResumeData(): Promise<ResumeData> {
  const currentTime = Date.now();

  // Check if cache is valid
  if (
    resumeCache &&
    resumeLastCacheTime &&
    currentTime - resumeLastCacheTime < resumeCacheDuration
  ) {
    return resumeCache;
  }

  // Fetch data directly from the database using Prisma
  const educations = await prisma.education.findMany();
  const skills = await prisma.skill.findMany();
  const experiences = await prisma.experience.findMany();
  const awards = await prisma.award.findMany();
  const leadershipRoles = await prisma.leadership.findMany();
  const hero = await prisma.hero.findFirst(); // Assuming there's only one hero

  resumeCache = {
    educations,
    skills,
    experiences,
    awards,
    leadershipRoles,
    hero,
  };
  resumeLastCacheTime = currentTime; // Update last cache time

  return resumeCache;
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resumeData = await getResumeData();
  const name = resumeData.hero?.name || "Your Name";
  const url = process.env.VERCEL_URL || "https://your-fallback-url.com";

  return {
    title: `Interactive Resume | ${name}`,
    description: `An interactive and shareable resume showcasing ${name}'s skills, experience, and projects.`,
    keywords: [
      "resume",
      "portfolio",
      "skills",
      "experience",
      "projects",
      "interactive",
      name,
    ],
    openGraph: {
      title: `Interactive Resume | ${name}`,
      description: `Explore ${name}'s skills, experience, and projects in this interactive resume.`,
      type: "website",
      url,
    },
  };
}

export default async function Home() {
  const resumeData = await getResumeData();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <main className="flex-1">
        <Hero heroInfo={resumeData.hero} />
        <EducationAndSkills
          educations={resumeData.educations}
          skills={resumeData.skills}
        />
        <Experience experiences={resumeData.experiences} />
        <AwardsAndLeadership
          awards={resumeData.awards}
          leadershipRoles={resumeData.leadershipRoles}
        />
        <Footer heroInfo={resumeData.hero} />
      </main>
    </div>
  );
}
