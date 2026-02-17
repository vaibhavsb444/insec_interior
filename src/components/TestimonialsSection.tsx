import { useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTestimonials } from "@/hooks/useFirebaseData";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data: testimonials } = useTestimonials();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="section-padding bg-charcoal" ref={ref}>
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="gold-line mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-warm-white mb-12">
            Client <span className="italic font-light text-brass-light">Stories</span>
          </h2>

          <div className="relative min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Quote className="text-brass/40 mx-auto mb-6" size={48} />
                <p className="text-warm-white/90 text-lg md:text-xl leading-relaxed italic mb-8 font-light">
                  "{t?.review}"
                </p>
                <p className="text-brass font-heading text-lg font-semibold">{t?.name}</p>
                <p className="text-warm-white/50 text-sm mt-1">{t?.project}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)}
              className="text-warm-white/40 hover:text-warm-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === current ? "w-8 bg-brass" : "w-3 bg-warm-white/30"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="text-warm-white/40 hover:text-warm-white transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
