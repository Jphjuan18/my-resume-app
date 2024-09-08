import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Hero } from "@prisma/client";
import { LucideIcon, Github, Linkedin, Twitter, Instagram } from "lucide-react";

const socialMediaIcons: { [key: string]: LucideIcon } = {
  Github,
  Linkedin,
  Twitter,
  Instagram,
};

interface HeroComponentProps {
  heroInfo: Hero | null;
}

export default function HeroComponent({ heroInfo }: HeroComponentProps) {
  const isLoading = !heroInfo;

  if (isLoading) {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="h-[400px] bg-gray-200 animate-pulse rounded-xl lg:order-last"></div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!heroInfo) return null;

  const socialMediaUrls = heroInfo.socialMediaUrls as Record<
    string,
    string
  > | null;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-10">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <Image
            src="/hero_1.webp"
            width={400}
            height={400}
            alt={heroInfo.name}
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {heroInfo.name}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {heroInfo.title}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {socialMediaUrls &&
                Object.entries(socialMediaUrls).map(
                  ([platform, url], index) => {
                    const Icon =
                      socialMediaIcons[platform] || socialMediaIcons.Github;
                    return (
                      <Button
                        key={platform}
                        asChild
                        variant={index === 0 ? "default" : "outline"}
                      >
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          <Icon className="mr-2 h-4 w-4" />
                          {platform}
                        </a>
                      </Button>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
