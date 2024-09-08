import Projects from "@/components/Projects";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <main className="flex-1">
        <Projects />
      </main>
    </div>
  );
}
