import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHeroImages } from "@/hooks/useFirebaseData";

const HeroSection = () => {
  const { data: images } = useHeroImages();
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  const hasImages = images && images.length > 0;

  // ── Preload ALL images the moment the array arrives ──────────────────
  useEffect(() => {
    if (!hasImages) return;
    images.forEach((img: { url: string }, i: number) => {
      const image = new Image();
      image.src = img.url;
      image.onload = () => setLoaded((prev) => ({ ...prev, [i]: true }));
    });
  }, [hasImages, images]);

  // ── 8 s per slide so visitors can actually appreciate the room ───────
  const SLIDE_DURATION = 8000;

  const next = useCallback(() => {
    if (!hasImages) return;
    setCurrent((prev) => (prev + 1) % images.length);
  }, [hasImages, images?.length]);

  const prev = () => {
    if (!hasImages) return;
    setCurrent((p) => (p - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!hasImages) return;
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [next, hasImages]);

  if (!hasImages) {
    return (
      <section
        id="home"
        className="relative h-screen w-full overflow-hidden bg-charcoal flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-[2px] bg-brass animate-pulse" />
          <div className="text-warm-white/40 text-xs tracking-[0.4em] uppercase font-light animate-pulse">
            Loading experience
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative h-[100svh] w-full overflow-hidden">

      {/* ── Background Images ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          {/* Shimmer placeholder until image byte-decodes */}
          {!loaded[current] && (
            <div className="absolute inset-0 bg-charcoal animate-pulse z-10" />
          )}
          <img
            src={images[current]?.url}
            alt={images[current]?.title || "Interior design showcase"}
            fetchPriority={current === 0 ? "high" : "auto"}
            decoding="async"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 35%" }}
            onLoad={() => setLoaded((prev) => ({ ...prev, [current]: true }))}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Cinematic Overlay ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(10,8,6,0.15) 0%,
              rgba(10,8,6,0.05) 30%,
              rgba(10,8,6,0.45) 70%,
              rgba(10,8,6,0.80) 100%),
            linear-gradient(to right,
              rgba(10,8,6,0.30) 0%,
              transparent 50%)
          `,
        }}
      />

      {/* ── Decorative corner marks (desktop only) ────────────────────── */}
      <div className="hidden md:block absolute top-8 left-8 w-12 h-12 border-t border-l border-brass/40" />
      <div className="hidden md:block absolute top-8 right-8 w-12 h-12 border-t border-r border-brass/40" />
      <div className="hidden md:block absolute bottom-20 left-8 w-12 h-12 border-b border-l border-brass/40" />
      <div className="hidden md:block absolute bottom-20 right-8 w-12 h-12 border-b border-r border-brass/40" />

      {/* ── Progress bar synced to SLIDE_DURATION ─────────────────────── */}
      <motion.div
        key={`bar-${current}`}
        className="absolute top-0 left-0 h-[2px] bg-brass z-10"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
      />

      {/* ── Content Layer ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center md:items-end md:justify-start">
        <div className="w-full px-6 pb-0 md:px-16 md:pb-24 lg:px-24 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center md:text-left"
            >
              <motion.div
                className="flex items-center gap-3 justify-center md:justify-start mb-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <div className="h-[1px] w-8 bg-brass" />
                <span className="text-brass text-[10px] md:text-xs tracking-[0.35em] uppercase font-medium">
                  Premium Interiors
                </span>
                <div className="h-[1px] w-8 bg-brass" />
              </motion.div>

              <motion.h1
                className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-warm-white leading-[1.08] mb-5 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                {images[current]?.title || "Defining the Art of Modern Living"}
              </motion.h1>

              <motion.p
                className="text-warm-white/70 text-sm sm:text-base md:text-lg font-light max-w-xl mx-auto md:mx-0 mb-8 md:mb-10 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Premium interior design solutions crafted with passion, precision,
                and an unwavering commitment to excellence.{" "}
                <span className="text-brass/80">Pan India service.</span>
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                <button
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="relative overflow-hidden bg-brass text-primary-foreground px-8 py-3.5 md:px-10 md:py-4 text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase rounded transition-all duration-300 hover:bg-brass-dark hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] active:scale-[0.97]"
                >
                  Consult Now
                </button>
                <button
                  onClick={() =>
                    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="border border-warm-white/30 text-warm-white px-8 py-3.5 md:px-10 md:py-4 text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase rounded backdrop-blur-sm transition-all duration-300 hover:bg-warm-white/10 hover:border-warm-white/60 active:scale-[0.97]"
                >
                  View Portfolio
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Slide Controls ────────────────────────────────────────────── */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        <button
          onClick={prev}
          className="text-warm-white/50 hover:text-warm-white transition-all duration-200 hover:scale-110 p-1"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {images.map((_: unknown, i: number) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-[3px] rounded-full overflow-hidden transition-all duration-500"
              style={{ width: i === current ? 32 : 16 }}
            >
              <span className="absolute inset-0 rounded-full" style={{ background: "rgba(255,255,255,0.25)" }} />
              {i === current && (
                <motion.span
                  key={`fill-${current}`}
                  className="absolute inset-0 rounded-full bg-brass"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={next}
          className="text-warm-white/50 hover:text-warm-white transition-all duration-200 hover:scale-110 p-1"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* ── Slide counter (desktop only) ──────────────────────────────── */}
      <div className="hidden md:flex absolute right-8 bottom-10 flex-col items-center gap-2 z-10">
        <span className="text-warm-white text-sm font-light tabular-nums">
          {String(current + 1).padStart(2, "0")}
        </span>
        <div className="h-12 w-[1px] bg-warm-white/20" />
        <span className="text-warm-white/40 text-sm font-light tabular-nums">
          {String(images.length).padStart(2, "0")}
        </span>
      </div>

    </section>
  );
};

export default HeroSection;