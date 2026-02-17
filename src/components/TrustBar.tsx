import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, CheckCircle, Globe } from "lucide-react";

const stats = [
  { icon: CheckCircle, value: "100+", label: "Projects Completed" },
  { icon: Award, value: "5+", label: "Years of Excellence" },
  { icon: Users, value: "Certified", label: "Interior Designers" },
  { icon: Globe, value: "Pan India", label: "Service Coverage" },
];

const TrustBar = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="bg-charcoal py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <stat.icon className="text-brass mb-3" size={28} />
              <span className="text-warm-white text-2xl md:text-3xl font-heading font-bold mb-1">
                {stat.value}
              </span>
              <span className="text-warm-white/60 text-sm tracking-wider uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
