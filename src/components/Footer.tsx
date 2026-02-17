import { Instagram, Mail, Phone, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const quickLinks = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/insec.77",
      color: "hover:bg-pink-600 hover:shadow-[0_0_20px_#db2777]", // Pink Glow for Insta
      label: "Instagram"
    },
    {
      icon: Mail,
      href: "mailto:insec24hours@gmail.com",
      color: "hover:bg-red-500 hover:shadow-[0_0_20px_#ef4444]", // Red Glow for Gmail
      label: "Email"
    },
    {
      icon: Phone,
      href: "https://wa.me/918788716351",
      color: "hover:bg-green-500 hover:shadow-[0_0_20px_#22c55e]", // Green Glow for WhatsApp
      label: "WhatsApp"
    }
  ];

  return (
    <footer className="bg-charcoal pt-16 pb-8 border-t border-warm-white/5">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Brand & Socials */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-heading text-3xl font-bold text-warm-white tracking-wide">INSEC</span>
              <span className="font-heading text-3xl font-light italic text-brass">Interior</span>
            </div>
            <p className="text-warm-white/60 text-sm leading-relaxed max-w-xs mb-8">
              Transforming spaces into extraordinary experiences. Premium interior design solutions across India.
            </p>
            
            {/* Animated Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-12 h-12 rounded-full bg-warm-white/5 border border-warm-white/10 flex items-center justify-center text-warm-white/70 transition-all duration-300 hover:-translate-y-1 hover:text-white ${social.color}`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-warm-white font-heading text-xl font-semibold mb-6 tracking-wide relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-brass"></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })}
                    className="text-warm-white/50 text-sm hover:text-brass hover:translate-x-1 transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brass/40"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-warm-white font-heading text-xl font-semibold mb-6 tracking-wide relative inline-block">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-brass"></span>
            </h4>
            <div className="space-y-4 text-warm-white/60 text-sm">
              <p className="flex flex-col">
                <span className="text-brass font-medium mb-1">Working Hours</span>
                <span>Mon – Sat: 10:00 AM – 7:00 PM</span>
                <span>Sun: By Appointment Only</span>
              </p>
              <p className="flex flex-col mt-4">
                <span className="text-brass font-medium mb-1">Head Office</span>
                <span>Mumbai, Maharashtra, India</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-warm-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
          <p className="text-warm-white/40 text-sm">
            © {new Date().getFullYear()} Insec Interior. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-warm-white/40 hover:text-brass transition-colors text-sm"
          >
            Back to Top
            <div className="w-8 h-8 rounded-full border border-warm-white/20 flex items-center justify-center group-hover:border-brass group-hover:bg-brass/10 transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;