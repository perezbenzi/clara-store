interface BadgeProps {
  label: string;
}

export default function Badge({ label }: BadgeProps) {
  return (
    <span className="absolute top-3 right-3 bg-white text-ink text-[11px] font-semibold px-2 py-0.5 uppercase tracking-wider">
      {label}
    </span>
  );
}
