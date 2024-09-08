import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const prisma = new PrismaClient();

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
  });
  if (!project) {
    notFound();
  }
  return project;
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProject(params.id);

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <Link href="/projects">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" /> {project.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-500">Year:</span>
              <span className="ml-2">{project.year}</span>
            </div>
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-500">Tag:</span>
              <span className="ml-2">{project.tag}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Description:</h3>
              <p>{project.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
