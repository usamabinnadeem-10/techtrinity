/** A titled policy section: an h2 followed by its body content. Presentational. */
export function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold tracking-[-0.02em]">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-[1.7] text-muted">
        {children}
      </div>
    </section>
  );
}
