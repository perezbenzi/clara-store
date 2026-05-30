export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '94dvh' }}>
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&q=90"
      >
        <source
          src="/hero-video.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient overlay — bottom-heavy */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

      {/* Decorative play icon — centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      </div>

      {/* Bottom-left text */}
      <div className="absolute bottom-10 left-6 md:left-12">
        <p className="uppercase tracking-[0.25em] text-[11px] text-white/80 mb-3">
          Byron Bay&apos;s finest
        </p>
        <h1 className="font-display text-white text-4xl md:text-[86px] leading-none uppercase">
          Made Fresh
          <br />
          Every Day
        </h1>
      </div>
    </section>
  );
}
