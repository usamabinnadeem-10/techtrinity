export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-screen-xl px-10${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
