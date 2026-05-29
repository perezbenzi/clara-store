import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "outline-white";
  className?: string;
}

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-block uppercase tracking-[0.15em] underline px-7 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer";

  const variants = {
    primary: "bg-ink text-white hover:bg-[#333333]",
    "outline-white":
      "bg-white text-ink hover:bg-white/90",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
