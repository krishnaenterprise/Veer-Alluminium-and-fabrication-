// Central business / brand configuration used across the site & SEO.
export const site = {
  name: "Veer Aluminium & Fabrication",
  shortName: "Veer Aluminium",
  tagline: "Premium Aluminium, Glass & Fabrication Solutions",
  description:
    "Veer Aluminium & Fabrication delivers premium aluminium windows, UPVC, toughened glass, structural glazing, ACP cladding, steel fabrication and railings across Palanpur and Gujarat with precision engineering and modern design.",
  url: "https://veeraluminium.in",
  phone: "+91 97122 16273",
  phoneRaw: "919712216273",
  whatsapp: "919712216273",
  email: "info@veeraluminium.in",
  address: {
    line: "Near Railway Overbridge, Ruppura",
    city: "Palanpur",
    state: "Gujarat",
    postalCode: "385001",
    country: "IN",
    full: "Near Railway Overbridge, Ruppura, Palanpur, Gujarat - 385001",
  },
  geo: { lat: 24.1747, lng: 72.4324 },
  hours: "Mon–Sat: 9:00 AM – 8:00 PM",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },
  keywords: [
    "Aluminium Windows Palanpur",
    "UPVC Windows Gujarat",
    "Glass Fabrication Palanpur",
    "Aluminium Fabrication Gujarat",
    "ACP Work Palanpur",
    "Toughened Glass Gujarat",
    "Structural Glazing Gujarat",
    "Steel Fabrication Palanpur",
  ],
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/projects" },
  { label: "Estimate", href: "/estimate" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const whatsappLink = (text = "Hello Veer Aluminium, I'd like a free estimate.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
