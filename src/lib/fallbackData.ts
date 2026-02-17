import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import aboutTeam from "@/assets/about-team.jpg";

export const fallbackHeroImages = [hero1, hero2, hero3];

export const fallbackAboutImage = aboutTeam;

export const fallbackServices = [
  {
    id: "1",
    title: "Residential Design",
    description: "Transform your living spaces into luxurious sanctuaries. From living rooms to modular kitchens, we craft interiors that reflect your personality.",
    icon: "home",
  },
  {
    id: "2",
    title: "Commercial Design",
    description: "Elevate your business environment with designs that inspire productivity and impress clients. Offices, retail spaces, and cafés.",
    icon: "building",
  },
  {
    id: "3",
    title: "3D Visualization",
    description: "Experience your dream space before it's built. Our photorealistic 3D renders bring your vision to life with stunning detail.",
    icon: "cube",
  },
  {
    id: "4",
    title: "Turnkey Projects",
    description: "From concept to completion, we handle everything. Sit back while we manage design, materials, and execution seamlessly.",
    icon: "key",
  },
];

export const fallbackPortfolio = [
  { id: "1", url: hero1, category: "Living Room", title: "Modern Luxury Living" },
  { id: "2", url: hero3, category: "Kitchen", title: "Premium Kitchen Design" },
  { id: "3", url: hero2, category: "Bedroom", title: "Elegant Bedroom Suite" },
  { id: "4", url: hero1, category: "Commercial", title: "Corporate Office" },
  { id: "5", url: hero3, category: "Kitchen", title: "Modular Kitchen" },
  { id: "6", url: hero2, category: "Living Room", title: "Contemporary Living" },
];

export const fallbackTestimonials = [
  {
    id: "1",
    name: "Rajesh Sharma",
    review: "Insec Interior transformed our home beyond our imagination. Their attention to detail and commitment to quality is unmatched. Every room tells a story of elegance.",
    project: "3BHK Renovation, Mumbai",
  },
  {
    id: "2",
    name: "Priya Mehta",
    review: "The team delivered our office redesign on time and within budget. The space now reflects our brand perfectly and our employees love the new environment.",
    project: "Corporate Office, Pune",
  },
  {
    id: "3",
    name: "Amit Patel",
    review: "From the 3D visualization to the final handover, every step was professional. Our modular kitchen is now the heart of our home. Highly recommended!",
    project: "Kitchen Design, Ahmedabad",
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Consultation",
    description: "We begin by understanding your vision, lifestyle, and requirements through an in-depth discussion.",
  },
  {
    step: 2,
    title: "Concept & Design",
    description: "Our designers create detailed 2D layouts and photorealistic 3D renders for your approval.",
  },
  {
    step: 3,
    title: "Execution",
    description: "Expert craftsmen bring the design to life with premium materials and meticulous attention to detail.",
  },
  {
    step: 4,
    title: "Handover",
    description: "The final reveal — a walkthrough of your beautifully transformed space, ready to inspire.",
  },
];
