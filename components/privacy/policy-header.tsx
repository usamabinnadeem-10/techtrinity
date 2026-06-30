/** Title + publish-date header for the privacy policy. Presentational. */
export function PolicyHeader({
  title,
  lastUpdated,
}: {
  title: string;
  lastUpdated: string;
}) {
  return (
    <header>
      <h1 className="font-display text-4xl font-bold tracking-[-0.03em]">{title}</h1>
      <p className="mt-3 font-mono text-[13px] uppercase tracking-[0.18em] text-muted-foreground">
        Last updated: {lastUpdated}
      </p>
    </header>
  );
}
