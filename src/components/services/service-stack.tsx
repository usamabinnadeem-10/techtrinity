type ServiceStackProps = {
  readonly stack: readonly string[];
};

export function ServiceStack({ stack }: ServiceStackProps) {
  return (
    <section className="border-b border-border py-12">
      <h2 className="font-serif text-2xl text-fg">Built with</h2>

      <div className="mt-6 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="border border-border px-3 py-1.5 font-mono text-xs text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
