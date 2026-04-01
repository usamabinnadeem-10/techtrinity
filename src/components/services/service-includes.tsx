type ServiceIncludesProps = {
  readonly includes: readonly string[];
};

export function ServiceIncludes({ includes }: ServiceIncludesProps) {
  return (
    <section className="border-b border-border py-12">
      <h2 className="font-serif text-2xl text-fg">What&apos;s included</h2>

      <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {includes.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 font-sans text-sm text-fg"
          >
            <span className="block h-1.5 w-1.5 bg-fg" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
