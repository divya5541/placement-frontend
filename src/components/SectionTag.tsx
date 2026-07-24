export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-[color:var(--color-brand-yellow-light)] text-[color:var(--color-brand-black)] dark:bg-[color:var(--color-brand-yellow)]/20 dark:text-[color:var(--color-brand-yellow)] text-xs font-semibold uppercase tracking-wider px-3 py-1">
      {children}
    </span>
  );
}
