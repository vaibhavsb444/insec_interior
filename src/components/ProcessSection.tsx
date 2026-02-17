import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/lib/fallbackData";
import { MessageSquare, Palette, Hammer, PartyPopper } from "lucide-react";

const stepIcons = [MessageSquare, Palette, Hammer, PartyPopper];

const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="gold-line mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="italic font-light text-brass">Process</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A seamless journey from vision to reality, guided by expertise at every step.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          {processSteps.map((step, i) => {
            const Icon = stepIcons[i];
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className={`relative flex items-center mb-12 md:mb-16 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:gap-0 gap-4`}
              >
                <div className={`md:w-1/2 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"} text-center md:text-inherit`}>
                  <span className="text-brass text-sm tracking-widest uppercase font-semibold">
                    Step {step.step}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-foreground mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-brass/10 border-2 border-brass items-center justify-center z-10">
                  <Icon className="text-brass" size={22} />
                </div>
                <div className="md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
