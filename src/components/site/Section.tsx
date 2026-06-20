import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-14 sm:py-20 ${className}`}>
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          {eyebrow && (
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
              {eyebrow}
            </div>
          )}
          <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
