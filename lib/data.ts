// Static content data — services, projects, testimonials, stats, timeline.
// Editable through the CMS (see /app/api/content) in a production DB; here it
// provides rich default content for the marketing site.

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  icon: string; // lucide icon name
  features: string[];
};

export const services: Service[] = [
  {
    slug: "aluminium-windows",
    title: "Aluminium Windows",
    short: "Sleek, durable, weather-sealed aluminium window systems.",
    description:
      "Precision-engineered aluminium windows with powder-coated finishes, multi-point locking and superior thermal performance for homes and commercial towers.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    icon: "AppWindow",
    features: ["Powder coated frames", "Multi-point locking", "Weather sealed", "10 year frame warranty"],
  },
  {
    slug: "aluminium-doors",
    title: "Aluminium Doors",
    short: "Premium entrance & interior aluminium door systems.",
    description:
      "Robust aluminium doors engineered for smooth operation, security and architectural elegance — available in hinged, sliding and folding configurations.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    icon: "DoorOpen",
    features: ["Heavy-duty hardware", "Slim sightlines", "Custom finishes", "Sound insulation"],
  },
  {
    slug: "sliding-windows",
    title: "Sliding Windows",
    short: "Space-saving sliding systems with effortless glide.",
    description:
      "2, 3 and 4-track sliding windows with stainless rollers and mosquito mesh options for uninterrupted views and ventilation.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    icon: "MoveHorizontal",
    features: ["Smooth SS rollers", "Mosquito mesh ready", "Slim profiles", "Easy maintenance"],
  },
  {
    slug: "upvc-windows",
    title: "UPVC Windows",
    short: "Energy-efficient, low-maintenance UPVC systems.",
    description:
      "German-profile UPVC windows offering excellent thermal & acoustic insulation, corrosion resistance and lasting performance in Gujarat's climate.",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1200&q=80",
    icon: "Frame",
    features: ["Thermal insulation", "Acoustic comfort", "Corrosion-free", "UV resistant"],
  },
  {
    slug: "toughened-glass",
    title: "Toughened Glass",
    short: "5x stronger tempered safety glass solutions.",
    description:
      "Heat-treated toughened glass for railings, partitions, facades and shopfronts — safe, scratch resistant and crystal clear.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    icon: "Layers",
    features: ["Safety certified", "Heat treated", "Custom thickness", "Edge polished"],
  },
  {
    slug: "structural-glazing",
    title: "Structural Glazing",
    short: "Seamless full-glass facades for modern buildings.",
    description:
      "Spider and unitised structural glazing that creates striking frameless glass facades for corporate and commercial architecture.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    icon: "Building2",
    features: ["Frameless facades", "Spider fittings", "Weatherproof seals", "Engineered design"],
  },
  {
    slug: "acp-cladding",
    title: "ACP Cladding",
    short: "Vibrant, durable aluminium composite cladding.",
    description:
      "Aluminium composite panel cladding for facades and signage in a wide range of finishes — fire-rated and weather-resistant options available.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    icon: "PanelsTopLeft",
    features: ["Fire-rated panels", "100+ finishes", "Lightweight", "Weatherproof"],
  },
  {
    slug: "steel-fabrication",
    title: "Steel Fabrication",
    short: "Custom mild & stainless steel fabrication.",
    description:
      "Structural and decorative steel fabrication — gates, sheds, staircases and load-bearing structures built to precise specification.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    icon: "Hammer",
    features: ["MS & SS work", "Welded to spec", "Anti-rust coating", "On-site install"],
  },
  {
    slug: "railings-balconies",
    title: "Railings & Balconies",
    short: "Glass, steel & aluminium railing systems.",
    description:
      "Designer balcony and staircase railings combining toughened glass with stainless steel for safety and contemporary style.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    icon: "Fence",
    features: ["Glass + SS railings", "Designer profiles", "Safety compliant", "Rust-free"],
  },
  {
    slug: "pop-work",
    title: "POP Work",
    short: "Elegant false ceilings & POP detailing.",
    description:
      "Plaster of Paris false ceilings, cornices and decorative detailing that complete a premium interior finish.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    icon: "PaintRoller",
    features: ["False ceilings", "Cornice design", "Smooth finish", "Lighting coves"],
  },
  {
    slug: "commercial-glass",
    title: "Commercial Glass Solutions",
    short: "Shopfronts, office partitions & facades.",
    description:
      "Complete commercial glass packages — automatic doors, frameless shopfronts and office partition systems delivered turnkey.",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    icon: "Store",
    features: ["Automatic doors", "Office partitions", "Frameless fronts", "Turnkey delivery"],
  },
  {
    slug: "residential-glass",
    title: "Residential Glass Solutions",
    short: "Shower cubicles, mirrors & home glazing.",
    description:
      "Premium residential glass — shower enclosures, designer mirrors, glass doors and balcony glazing tailored to your home.",
    image:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
    icon: "Home",
    features: ["Shower cubicles", "Designer mirrors", "Balcony glazing", "Custom sizing"],
  },
];

export type Project = {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Industrial" | "Glass Projects" | "Railings" | "ACP Work";
  location: string;
  image: string;
  description: string;
};

export const projects: Project[] = [
  { id: "p1", title: "Skyline Corporate Tower", category: "Commercial", location: "Palanpur", description: "Unitised structural glazing facade spanning 8 floors.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80" },
  { id: "p2", title: "The Veer Residency", category: "Residential", location: "Palanpur", description: "Full aluminium window & sliding door package for a luxury villa.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" },
  { id: "p3", title: "Glass Atrium Showroom", category: "Glass Projects", location: "Deesa", description: "Frameless toughened glass shopfront and atrium.", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80" },
  { id: "p4", title: "Sterling Industrial Shed", category: "Industrial", location: "Mehsana", description: "Heavy steel fabrication and ACP office block.", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80" },
  { id: "p5", title: "Sky Glass Balconies", category: "Railings", location: "Palanpur", description: "Frameless glass balcony railings with SS handrail.", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80" },
  { id: "p6", title: "Prism ACP Facade", category: "ACP Work", location: "Ahmedabad", description: "Multi-tone ACP cladding facade with concealed lighting.", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=80" },
  { id: "p7", title: "Lakeview Apartments", category: "Residential", location: "Palanpur", description: "UPVC windows across 64 apartment units.", image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1000&q=80" },
  { id: "p8", title: "Metro Retail Plaza", category: "Commercial", location: "Palanpur", description: "Spider glazing shopfronts and automatic glass doors.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" },
  { id: "p9", title: "Heritage Glass Partition", category: "Glass Projects", location: "Palanpur", description: "Office partition system in toughened glass.", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80" },
];

export const projectCategories = [
  "All",
  "Residential",
  "Commercial",
  "Industrial",
  "Glass Projects",
  "Railings",
  "ACP Work",
] as const;

export const stats = [
  { label: "Projects Completed", value: 1200, suffix: "+" },
  { label: "Happy Clients", value: 950, suffix: "+" },
  { label: "Years Experience", value: 15, suffix: "+" },
  { label: "Cities Served", value: 28, suffix: "" },
];

export const whyChooseUs = [
  { title: "Precision Manufacturing", desc: "CNC-cut profiles and tight tolerances for a flawless fit every time.", icon: "Ruler" },
  { title: "Quality Assurance", desc: "Certified materials and rigorous QC at every stage of fabrication.", icon: "BadgeCheck" },
  { title: "Expert Team", desc: "Skilled fabricators and installers with 15+ years of field expertise.", icon: "Users" },
  { title: "Modern Technology", desc: "Latest machinery and engineering software for superior results.", icon: "Cpu" },
  { title: "On-Time Delivery", desc: "Disciplined project management that respects your timeline.", icon: "Clock" },
  { title: "After-Sales Support", desc: "Responsive service and warranty support long after installation.", icon: "LifeBuoy" },
];

export const timeline = [
  { year: "2010", title: "Founded in Palanpur", desc: "Started as a specialised aluminium fabrication workshop." },
  { year: "2014", title: "Glass Division Launched", desc: "Expanded into toughened glass and structural glazing." },
  { year: "2018", title: "ACP & Facade Works", desc: "Began delivering large-scale facade and cladding projects." },
  { year: "2021", title: "1000+ Projects", desc: "Crossed a thousand completed residential & commercial projects." },
  { year: "2024", title: "Regional Leader", desc: "Recognised across 28 cities for precision and reliability." },
];

export const testimonials = [
  { name: "Rajesh Patel", role: "Homeowner, Palanpur", quote: "The aluminium windows transformed our home. Flawless finish and the team was incredibly professional throughout.", rating: 5 },
  { name: "Sneha Shah", role: "Architect, Ahmedabad", quote: "Veer's structural glazing on our commercial project was executed to perfection. My go-to fabrication partner now.", rating: 5 },
  { name: "Imran Vohra", role: "Builder, Deesa", quote: "Delivered UPVC windows for 64 flats on time and on budget. Quality and coordination were outstanding.", rating: 5 },
  { name: "Meera Joshi", role: "Interior Designer", quote: "Their glass railings and shower cubicles are simply premium. Clients always notice the quality.", rating: 5 },
];
