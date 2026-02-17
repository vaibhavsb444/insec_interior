import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, Send, Instagram, Banknote } from "lucide-react";
import { addDocument } from "@/lib/firebase";
import { toast } from "sonner";

// Updated list based on your requirements
const projectTypes = [
  "Residential / House",
  "Commercial / Office",
  "Shop / Retail",
  "Modular Kitchen",
  "3D Visualization",
  "Turnkey Project",
  "Other"
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [loading, setLoading] = useState(false);
  
  // Added 'budget' to the form state
  const [form, setForm] = useState({ 
    name: "", 
    mobile: "", 
    projectType: "", 
    budget: "", 
    message: "" 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim()) {
      toast.error("Please fill in your name and mobile number.");
      return;
    }
    setLoading(true);
    try {
      // Saves to 'inquiries' collection in Firebase
      await addDocument("inquiries", {
        ...form,
        submittedAt: new Date()
      });
      toast.success("Thank you! We'll get back to you shortly.");
      setForm({ name: "", mobile: "", projectType: "", budget: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="gold-line mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Let's <span className="italic font-light text-brass">Talk Design</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to transform your space? Share your vision with us and we'll bring it to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-secondary border border-border rounded-lg px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brass/30 focus:border-brass transition-all"
                maxLength={100}
                required
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="w-full bg-secondary border border-border rounded-lg px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brass/30 focus:border-brass transition-all"
                maxLength={15}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <select
                value={form.projectType}
                onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                className="w-full bg-secondary border border-border rounded-lg px-5 py-3.5 text-foreground focus:outline-none focus:ring-2 focus:ring-brass/30 focus:border-brass transition-all"
              >
                <option value="">Type of Project</option>
                {projectTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Approx. Budget (e.g. 5 Lakhs)"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="w-full bg-secondary border border-border rounded-lg px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brass/30 focus:border-brass transition-all"
                maxLength={50}
              />
            </div>

            <textarea
              placeholder="Tell us about your project requirements..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full bg-secondary border border-border rounded-lg px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brass/30 focus:border-brass transition-all resize-none"
              maxLength={1000}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brass text-primary-foreground py-4 rounded-lg font-semibold tracking-wider uppercase text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:bg-brass-dark disabled:opacity-50 hover:shadow-lg"
            >
              <Send size={18} />
              {loading ? "Sending..." : "Send Inquiry"}
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                Get In Touch
              </h3>
              <div className="space-y-6">
                
                {/* Phone / WhatsApp */}
                <div className="flex items-start gap-4 group cursor-pointer" onClick={() => window.open('https://wa.me/918762579444', '_blank')}>
                  <div className="w-12 h-12 rounded-full bg-brass/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brass/20 transition-colors">
                    <Phone className="text-brass" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Call / WhatsApp</p>
                    <p className="text-foreground font-medium group-hover:text-brass transition-colors">+91 87625 79444</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group cursor-pointer" onClick={() => window.open('mailto:insec24hours@gmail.com')}>
                  <div className="w-12 h-12 rounded-full bg-brass/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brass/20 transition-colors">
                    <Mail className="text-brass" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email Us</p>
                    <p className="text-foreground font-medium group-hover:text-brass transition-colors">insec24hours@gmail.com</p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4 group cursor-pointer" onClick={() => window.open('https://instagram.com/insec.77', '_blank')}>
                  <div className="w-12 h-12 rounded-full bg-brass/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brass/20 transition-colors">
                    <Instagram className="text-brass" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Follow Us</p>
                    <p className="text-foreground font-medium group-hover:text-brass transition-colors">@insec.77</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brass/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-brass" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Visit Us</p>
                    <p className="text-foreground font-medium">Pune, Maharashtra, India</p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;