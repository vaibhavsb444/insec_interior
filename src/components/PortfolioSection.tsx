import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { X } from "lucide-react";
import { usePortfolio } from "@/hooks/useFirebaseData";

// Updated Categories List
const categories = ["All", "Kitchen", "Living Room", "Bedroom", "Commercial", "Hall"];

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  // This hook now fetches bedrooms, halls, commercial, etc.
  const { data: portfolio } = usePortfolio();
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  // Filtering Logic
  const filtered = activeCategory === "All"
    ? portfolio
    : portfolio.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="gold-line mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="italic font-light text-brass">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            A curated selection of our finest projects, showcasing the breadth of our design capabilities.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-sm tracking-wider uppercase rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-brass text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id || i} // Fallback to index if ID is missing
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-lg"
                onClick={() => setLightbox(item.url)}
              >
                <img
                  src={item.url}
                  alt={item.title || "Portfolio Image"}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    i % 3 === 0 ? "h-72" : i % 3 === 1 ? "h-96" : "h-64"
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-all duration-500 flex items-end">
                  <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-brass text-xs tracking-widest uppercase mb-1">{item.category}</p>
                    <h3 className="text-warm-white font-heading text-lg font-semibold">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-warm-white hover:text-brass transition-colors">
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={lightbox}
              alt="Portfolio full view"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;