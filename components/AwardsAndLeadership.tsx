import React from "react";
import { Award, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Award as AwardType,
  Leadership as LeadershipRole,
} from "@prisma/client";

interface AwardsAndLeadershipProps {
  awards: AwardType[];
  leadershipRoles: LeadershipRole[];
}

const AwardsAndLeadership: React.FC<AwardsAndLeadershipProps> = ({
  awards,
  leadershipRoles,
}) => {
  const isLoading = !awards.length && !leadershipRoles.length;

  if (isLoading) {
    return (
      <section
        id="awards-and-leadership"
        className="w-full py-12 md:pb-24 lg:pb-32"
      >
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Awards & Leadership
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[0, 1].map((index) => (
              <Card
                key={index}
                className="h-full hover:bg-gray-50 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-6 h-6 mr-2 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[0, 1, 2, 3].map((item) => (
                      <li key={item} className="flex items-center">
                        <div className="w-2 h-2 bg-gray-200 rounded-full mr-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        <div className="ml-auto h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
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
      id="awards-and-leadership"
      className="w-full py-12 md:pb-24 lg:pb-32"
    >
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Awards & Leadership
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="h-full hover:bg-gray-50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2" /> Awards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {awards.map((award) => (
                  <li key={award.id} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span className="font-semibold">{award.title}</span>
                    <span className="ml-auto text-sm text-gray-500">
                      {Array.isArray(award.years)
                        ? award.years.join(", ")
                        : award.years}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="h-full hover:bg-gray-50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2" /> Leadership Roles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {leadershipRoles.map((role) => (
                  <li key={role.id}>
                    <div className="font-semibold">{role.title}</div>
                    {role.organization && (
                      <div className="text-sm text-gray-700">
                        {role.organization}
                      </div>
                    )}
                    <div className="text-sm text-gray-500">
                      {role.startDate} - {role.endDate || "Present"}
                    </div>
                    {role.description && (
                      <p className="text-sm mt-1">{role.description}</p>
                    )}
                    {role.responsibilities &&
                      role.responsibilities.length > 0 && (
                        <ul className="list-disc list-inside mt-1 text-sm">
                          {role.responsibilities.map((resp, index) => (
                            <li key={index} className="text-gray-700">
                              {resp}
                            </li>
                          ))}
                        </ul>
                      )}
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

export default AwardsAndLeadership;
