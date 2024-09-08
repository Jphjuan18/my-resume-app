import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
// const { PrismaClient } = require("@prisma/client");
// const fs = require("fs/promises");

const prisma = new PrismaClient();

async function main() {
  // Fetch current data for all models
  const users = await prisma.user.findMany();
  const resumes = await prisma.resume.findMany();
  const personalInfos = await prisma.personalInfo.findMany();
  const educations = await prisma.education.findMany();
  const skills = await prisma.skill.findMany();
  const experiences = await prisma.experience.findMany();
  const leaderships = await prisma.leadership.findMany();
  const projects = await prisma.project.findMany();
  const awards = await prisma.award.findMany();
  const hero = await prisma.hero.findMany();

  // Convert data to a string
  const seedData = `import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Users
  const users = ${JSON.stringify(users, null, 2)}
  for (const user of users) {
    await prisma.user.create({ data: user })
  }

  // Resumes
  const resumes = ${JSON.stringify(resumes, null, 2)}
  for (const resume of resumes) {
    await prisma.resume.create({ data: resume })
  }

  // Personal Info
  const personalInfos = ${JSON.stringify(personalInfos, null, 2)}
  for (const info of personalInfos) {
    await prisma.personalInfo.create({ data: info })
  }

  // Educations
  const educations = ${JSON.stringify(educations, null, 2)}
  for (const education of educations) {
    await prisma.education.create({ data: education })
  }

  // Skills
  const skills = ${JSON.stringify(skills, null, 2)}
  for (const skill of skills) {
    await prisma.skill.create({ data: skill })
  }

  // Experiences
  const experiences = ${JSON.stringify(experiences, null, 2)}
  for (const experience of experiences) {
    await prisma.experience.create({ data: experience })
  }

  // Leaderships
  const leaderships = ${JSON.stringify(leaderships, null, 2)}
  for (const leadership of leaderships) {
    await prisma.leadership.create({ data: leadership })
  }

  // Projects
  const projects = ${JSON.stringify(projects, null, 2)}
  for (const project of projects) {
    await prisma.project.create({ data: project })
  }

  // Awards
  const awards = ${JSON.stringify(awards, null, 2)}
  for (const award of awards) {
    await prisma.award.create({ data: award })
  }

  // Heroes
  const heroes = ${JSON.stringify(hero, null, 2)}
  for (const hero of heroes) {
    await prisma.hero.create({ data: hero })
  }

  console.log('Seed completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
`;

  // Write to file
  await fs.writeFile("prisma/seed.ts", seedData);

  console.log("Seed file generated");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
