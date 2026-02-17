import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHeroImages } from "@/hooks/useFirebaseData";

const HeroSection = () => {
  // 1. Fetch data (including 'title') from the hook
  const { data: images } = useHeroImages();
  const [current, setCurrent] = useState(0);

  // Safety Check
  const hasImages = images && images.length > 0;

  const next = useCallback(() => {
    if (!hasImages) return;
    setCurrent((prev) => (prev + 1) % images.length);
  }, [hasImages, images.length]);

  const prev = () => {
    if (!hasImages) return;
    setCurrent((p) => (p - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!hasImages) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, hasImages]);

  // Loading State
  if (!hasImages) {
    return (
      <section id="home" className="relative h-screen w-full overflow-hidden bg-charcoal flex items-center justify-center">
        <div className="text-warm-white/50 animate-pulse">Loading experience...</div>
      </section>
    );
  }

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={images[current]?.url}
            // Use title as alt text for better accessibility
            alt={images[current]?.title || "Interior design showcase"}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />

      {/* Content Layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl">
          {/* We wrap text in AnimatePresence so it fades when the slide changes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current} // Key change triggers the animation
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="gold-line mx-auto mb-8" />
              
              {/* DYNAMIC TITLE HERE */}
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-warm-white leading-tight mb-6">
                {images[current]?.title || "Defining the Art of Modern Living"}
              </h1>

              <p className="text-warm-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                Premium interior design solutions crafted with passion, precision, and an unwavering commitment to excellence. Pan India service.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-brass text-primary-foreground px-10 py-4 text-sm font-semibold tracking-widest uppercase rounded transition-all duration-300 hover:bg-brass-dark hover:shadow-2xl"
                >
                  Consult Now
                </button>
                <button
                  onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                  className="border border-warm-white/40 text-warm-white px-10 py-4 text-sm font-semibold tracking-widest uppercase rounded transition-all duration-300 hover:bg-warm-white/10"
                >
                  View Portfolio
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button onClick={prev} className="text-warm-white/60 hover:text-warm-white transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? "w-8 bg-brass" : "w-4 bg-warm-white/40"
              }`}
            />
          ))}
        </div>
        <button onClick={next} className="text-warm-white/60 hover:text-warm-white transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;