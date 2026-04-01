import { Container } from "@/components/container";

const ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Claude API",
  "AWS",
  "Vercel",
] as const;

export function StackStrip() {
  return (
    <div className="bg-fg py-3">
      <Container>
        <div
          role="list"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
        >
          {ITEMS.map((item, i) => (
            <span
              key={item}
              role="listitem"
              className="flex items-center gap-4"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                {item}
              </span>
              {i < ITEMS.length - 1 && (
                <span aria-hidden="true" className="text-muted">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
