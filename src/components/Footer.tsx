import { Instagram, Facebook, Linkedin, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const quickLinks = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="bg-charcoal pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-heading text-2xl font-bold text-warm-white">INSEC</span>
              <span className="font-heading text-2xl font-light italic text-brass-light">Interior</span>
            </div>
            <p className="text-warm-white/50 text-sm leading-relaxed max-w-xs">
              Transforming spaces into extraordinary experiences. Premium interior design solutions across India.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-warm-white/10 flex items-center justify-center text-warm-white/60 hover:bg-brass hover:text-primary-foreground transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-warm-white font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })}
                    className="text-warm-white/50 text-sm hover:text-brass transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-warm-white font-heading text-lg font-semibold mb-4">Working Hours</h4>
            <div className="space-y-2 text-warm-white/50 text-sm">
              <p>Monday – Saturday</p>
              <p className="text-warm-white/80">10:00 AM – 7:00 PM</p>
              <p className="mt-4">Sunday</p>
              <p className="text-warm-white/80">By Appointment Only</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-warm-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-warm-white/40 text-sm">
            © 2026 Insec Interior. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-warm-white/20 flex items-center justify-center text-warm-white/40 hover:text-brass hover:border-brass transition-all duration-300"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
