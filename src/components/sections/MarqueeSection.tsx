export default function MarqueeSection() {
  const items = Array(8).fill(null);

  return (
    <section className="bg-brand-pink py-5 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {items.map((_, i) => (
          <span
            key={i}
            className="flex items-center gap-4 px-4 font-display text-white uppercase text-5xl md:text-6xl whitespace-nowrap"
          >
            FRESH CAKES
            <span className="text-white/50 text-3xl">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
