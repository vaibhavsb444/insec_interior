import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fallbackAboutImage } from "@/lib/fallbackData";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={fallbackAboutImage}
                alt="Insec Interior team at work"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brass text-primary-foreground p-6 rounded-lg hidden md:block">
              <span className="text-3xl font-heading font-bold block">5+</span>
              <span className="text-sm tracking-wider uppercase">Years</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="gold-line mb-6" />
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Crafting Spaces That
              <span className="italic font-light text-brass block">Inspire Living</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At Insec Interior, we believe that great design is more than aesthetics — it's about creating environments that enrich daily life. Founded with a passion for transforming spaces, our team of certified designers brings together creativity, functionality, and craftsmanship.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From intimate residential makeovers to large-scale commercial projects, we approach every project with the same dedication to quality, innovation, and client satisfaction. Our end-to-end service ensures a seamless experience from the first consultation to the final reveal.
            </p>
            <div className="flex gap-8">
              <div>
                <span className="text-3xl font-heading font-bold text-brass">100+</span>
                <p className="text-sm text-muted-foreground mt-1">Happy Clients</p>
              </div>
              <div>
                <span className="text-3xl font-heading font-bold text-brass">250+</span>
                <p className="text-sm text-muted-foreground mt-1">Designs Delivered</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
