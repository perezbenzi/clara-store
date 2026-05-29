interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({
  children,
  className = "",
}: SectionLabelProps) {
  return (
    <p
      className={`uppercase tracking-[0.2em] text-[11px] text-muted font-medium ${className}`}
    >
      {children}
    </p>
  );
}
