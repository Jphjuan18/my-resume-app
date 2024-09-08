import React from "react";
import { GraduationCap, Wrench } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Education, Skill } from "@prisma/client";

interface EducationAndSkillsProps {
  educations: Education[];
  skills: Skill[];
}

const EducationAndSkills: React.FC<EducationAndSkillsProps> = ({
  educations,
  skills,
}) => {
  const isLoading = !educations.length && !skills.length;

  if (isLoading) {
    return (
      <section
        id="education-and-skills"
        className="w-full py-12 md:pb-16 lg:pb-16"
      >
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Education & Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[0, 1].map((index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-6 h-6 mr-2 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[0, 1, 2].map((item) => (
                      <li key={item} className="flex flex-col">
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse mb-1"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="education-and-skills"
      className="w-full py-12 md:pb-16 lg:pb-16"
    >
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Education & Technical Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="h-full hover:bg-gray-50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2" /> Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {educations.map((edu) => (
                  <li key={edu.id} className="flex flex-col">
                    <div className="font-semibold">{edu.degree}</div>
                    {edu.institution && (
                      <div className="text-sm text-gray-700">
                        {edu.institution}
                      </div>
                    )}
                    <Badge className="self-start mt-1">{`Completed: ${edu.completionDate}`}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="h-full hover:bg-gray-50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="mr-2" /> Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {skills.map((skillCategory) => (
                  <li key={skillCategory.id}>
                    <div className="font-semibold mb-1">
                      {skillCategory.category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EducationAndSkills;
