import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Home, Building2, ChefHat, KeyRound, Paintbrush, MonitorPlay } from "lucide-react";
import { useServices } from "@/hooks/useFirebaseData";

// --- 1. Real, Trust-Building Default Data ---
const defaultServices = [
  {
    id: "res-1",
    title: "Residential Design",
    description: "Transforming houses into homes with personalized layouts, color schemes, and furniture selection that reflect your lifestyle.",
    icon: "home"
  },
  {
    id: "com-2",
    title: "Commercial Spaces",
    description: "Designing productive and inspiring offices, retail shops, and hospitality spaces that elevate your brand image.",
    icon: "building"
  },
  {
    id: "mod-3",
    title: "Modular Kitchens",
    description: "Ergonomic and stylish modular kitchen solutions designed for maximum efficiency and modern aesthetics.",
    icon: "chef"
  },
  {
    id: "turn-4",
    title: "Turnkey Projects",
    description: "End-to-end execution from design to handover. We handle contractors, materials, and supervision so you can relax.",
    icon: "key"
  },
  {
    id: "vis-5",
    title: "3D Visualization",
    description: "See your dream space before it's built with our high-quality 3D renders and walkthroughs.",
    icon: "monitor"
  },
  {
    id: "dec-6",
    title: "Decor & Styling",
    description: "The finishing touches—lighting, artifacts, rugs, and soft furnishings that bring the whole look together.",
    icon: "paint"
  }
];

// --- 2. Icon Mapping ---
const iconMap: Record<string, React.ElementType> = {
  home: Home,
  building: Building2,
  chef: ChefHat,      // Added for Kitchens
  key: KeyRound,
  monitor: MonitorPlay, // Added for 3D
  paint: Paintbrush,    // Added for Decor
};

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  // Fetch from Firebase
  const { data: firebaseServices } = useServices();

  // Use Firebase data if available, otherwise use our professional default list
  const servicesToDisplay = (firebaseServices && firebaseServices.length > 0) 
    ? firebaseServices 
    : defaultServices;

  return (
    <section id="services" className="section-padding bg-secondary" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="gold-line mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="italic font-light text-brass">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From concept to completion, we offer comprehensive interior solutions that blend aesthetics with functionality.
          </p>
        </motion.div>

        {/* Updated Grid to handle more items gracefully */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesToDisplay.map((service, i) => {
            // Get the correct icon component
            const Icon = iconMap[service.icon] || Home;
            
            return (
              <motion.div
                key={service.id || i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-background p-8 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-border/50 group"
              >
                <div className="w-16 h-16 rounded-full bg-brass/10 flex items-center justify-center mb-6 group-hover:bg-brass group-hover:text-white transition-colors duration-300">
                  <Icon size={28} className="text-brass group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;