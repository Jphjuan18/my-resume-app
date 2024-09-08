import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Project } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient(); // Initialize Prisma Client

// Include these imports at the top
let projectsCache: Project[] | null = null;
const projectsCacheDuration = 1000 * 60 * 60 * 24; // 24-hour cache duration
let projectsLastCacheTime: number | null = null;

async function getProjects(): Promise<Project[]> {
  const currentTime = Date.now();

  // Check if cache is valid
  if (
    projectsCache &&
    projectsLastCacheTime &&
    currentTime - projectsLastCacheTime < projectsCacheDuration
  ) {
    return projectsCache;
  }

  // Fetch projects directly from the database using Prisma
  projectsCache = await prisma.project.findMany(); // Adjust the model name if necessary
  projectsLastCacheTime = currentTime; // Update last cache time

  return projectsCache;
}

export default async function Projects() {
  // Fetch projects directly in the server component
  let projects: Project[] = [];
  let isLoading = true;

  try {
    projects = await getProjects();
    isLoading = false; // Set loading to false after fetching projects
  } catch (error) {
    console.error("Error fetching projects:", error);
    isLoading = false; // Ensure loading is false even if fetching fails
  }

  // If still loading, you can show a loading skeleton or spinner
  if (isLoading) {
    return (
      <section id="projects" className="w-full py-12">
        <div className="container px-4 md:px-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" /> Projects & Presentations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, index) => (
                    <Card
                      key={index}
                      className="shadow-lg transition-transform transform hover:scale-105"
                    >
                      <CardContent className="p-4">
                        <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="w-full py-12">
      <div className="container px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" /> Projects & Presentations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <Link href={`/projects/${project.id}`} key={project.id}>
                    <Card className="shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-50 flex flex-col h-full">
                      <CardContent className="p-4 flex-1 d-flex">
                        <h3 className="text-md font-bold">{project.title}</h3>
                        <span className="text-sm text-gray-500">
                          {project.year}
                        </span>
                        <p className="text-sm mt-2 flex-grow">
                          {project.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
