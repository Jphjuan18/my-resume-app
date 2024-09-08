import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Experience } from "@prisma/client";

interface ExperienceComponentProps {
  experiences: Experience[];
}

const ExperienceComponent: React.FC<ExperienceComponentProps> = ({
  experiences,
}) => {
  const isLoading = !experiences.length;

  if (isLoading) {
    return (
      <section id="experience" className="w-full py-12">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Work Experience
          </h2>
          <Card className="relative overflow-hidden">
            <CardContent className="p-0">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="relative pl-16 pr-8 py-8 hover:bg-gray-50 transition-colors"
                >
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse mb-4"></div>
                  <ul className="space-y-2">
                    {[1, 2, 3].map((_, respIndex) => (
                      <li
                        key={respIndex}
                        className="h-3 bg-gray-200 rounded w-full animate-pulse"
                      ></li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="w-full py-12">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Work Experience</h2>
        <Card className="relative overflow-hidden">
          <CardContent className="p-0">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="relative pl-16 pr-8 py-8 hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <p className="text-sm font-medium text-gray-500 mb-4">
                  {exp.startDate} - {exp.endDate || "Present"}
                </p>
                <ul className="list-disc list-inside mt-1 text-sm">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex} className="text-sm text-gray-700">
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ExperienceComponent;
