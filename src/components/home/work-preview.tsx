import Link from "next/link";
import { Container } from "@/components/container";
import { projects } from "@/lib/projects";

const featured = projects.filter((p) => p.featured).slice(0, 2);

export function WorkPreview() {
  return (
    <section className="border-t border-border">
      <Container>
        <div className="flex items-baseline justify-between border-b border-border pt-10 pb-8">
          <h2 className="font-serif text-2xl text-fg">Selected work</h2>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Our Work
          </span>
        </div>

        <div className="grid grid-cols-2 divide-x divide-border">
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="flex flex-col gap-4 border-b border-border p-8 transition-colors hover:bg-surface"
            >
              <div className="flex flex-col gap-1">
                <span className="font-serif text-lg text-fg">
                  {project.name}
                </span>
                <span className="font-mono text-xs text-muted">
                  {project.category} · {project.year}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-serif text-3xl text-fg">
                  {project.outcomes[0].metric}
                </span>
                <span className="font-mono text-xs text-muted">
                  {project.outcomes[0].description}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/work"
          className="flex items-center border-t border-border py-4 font-mono text-xs text-muted transition-colors hover:text-fg"
        >
          View all work →
        </Link>
      </Container>
    </section>
  );
}
