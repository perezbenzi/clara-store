import Link from "next/link";

const footerLinks = [
  { label: "Wholesale", href: "/" },
  { label: "Flavours", href: "/flavours" },
  { label: "Locations", href: "/" },
  { label: "About", href: "/" },
];

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Instagram"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="TikTok"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.79a4.85 4.85 0 0 1-1.01-.1z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-pink px-6 py-14 md:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 items-start">
        {/* Left: tagline + social */}
        <div className="space-y-6">
          <p className="font-display text-white text-4xl md:text-5xl uppercase leading-tight">
            Baked  with
            <br />
            love &amp;
            butter
          </p>
          <div className="flex items-center gap-4 text-white">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>

        {/* Right: links 2x2 */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white font-body font-bold uppercase underline text-sm tracking-wide hover:opacity-70 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
