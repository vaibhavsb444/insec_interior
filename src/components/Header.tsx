import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = ["Home", "Services", "Portfolio", "About", "Contact"];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-header py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
          <span className={`font-heading text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-500 ${
            scrolled ? "text-foreground" : "text-warm-white"
          }`}>
            INSEC
          </span>
          <span className={`font-heading text-2xl md:text-3xl font-light italic transition-colors duration-500 ${
            scrolled ? "text-brass" : "text-brass-light"
          }`}>
            Interior
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className={`text-sm font-medium tracking-widest uppercase transition-colors duration-300 hover:text-brass ${
                scrolled ? "text-foreground" : "text-warm-white"
              }`}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="bg-brass text-primary-foreground px-6 py-2.5 text-sm font-semibold tracking-wider uppercase rounded transition-all duration-300 hover:bg-brass-dark hover:shadow-lg"
          >
            Get a Quote
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden transition-colors ${scrolled ? "text-foreground" : "text-warm-white"}`}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-header border-t border-border"
          >
            <nav className="flex flex-col items-center gap-4 py-6">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="text-foreground text-sm font-medium tracking-widest uppercase hover:text-brass transition-colors"
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="bg-brass text-primary-foreground px-6 py-2.5 text-sm font-semibold tracking-wider uppercase rounded mt-2"
              >
                Get a Quote
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
