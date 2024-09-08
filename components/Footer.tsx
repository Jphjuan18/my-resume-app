import { Github, Linkedin } from "lucide-react";
import { Hero } from "@prisma/client";

interface SocialMediaUrls {
  Github?: string;
  Linkedin?: string;
}

interface HeroComponentProps {
  heroInfo: Hero | null;
}

export default function Footer({ heroInfo }: HeroComponentProps) {
  if (!heroInfo) return null;

  const socialMediaUrls = heroInfo.socialMediaUrls as SocialMediaUrls | null;

  return (
    <footer className="w-full py-6 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row md:py-0">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          {heroInfo.name}
        </p>
        <div className="flex items-center space-x-4">
          {socialMediaUrls?.Github && (
            <a
              href={socialMediaUrls.Github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
          )}
          {socialMediaUrls?.Linkedin && (
            <a
              href={socialMediaUrls.Linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
