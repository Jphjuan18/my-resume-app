import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/#education-and-skills"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Skills
          </Link>
          <Link
            href="/#experience"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Experience
          </Link>
          <Link
            href="/#awards-and-leadership"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Leadership
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Projects
          </Link>
        </nav>
      </div>
    </header>
  );
}
