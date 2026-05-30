import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Veer Aluminium & Fabrication in Palanpur, Gujarat. Call, WhatsApp or request an instant quote for aluminium, glass and fabrication work.",
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address.full)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title={<>Let’s Build Something <span className="text-gold-gradient">Exceptional</span></>}
        subtitle="Reach out for a free consultation, site visit or instant quotation. We’re here to help."
        image="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-16 sm:py-24">
        <div className="container-tight grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="space-y-5">
            {[
              { icon: MapPin, title: "Visit Our Workshop", value: site.address.full, href: `https://www.google.com/maps?q=${encodeURIComponent(site.address.full)}` },
              { icon: Phone, title: "Call Us", value: site.phone, href: `tel:${site.phoneRaw}` },
              { icon: MessageCircle, title: "WhatsApp", value: "Chat with our team", href: whatsappLink() },
              { icon: Mail, title: "Email", value: site.email, href: `mailto:${site.email}` },
              { icon: Clock, title: "Working Hours", value: site.hours },
            ].map(({ icon: Icon, title, value, href }) => {
              const inner = (
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
                    <Icon size={22} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-current/50">{title}</p>
                    <p className="mt-0.5 font-medium">{value}</p>
                  </div>
                </div>
              );
              return (
                <div key={title} className="card-surface p-5 transition hover:-translate-y-0.5 hover:shadow-luxe">
                  {href ? <a href={href} target="_blank" rel="noreferrer">{inner}</a> : inner}
                </div>
              );
            })}

            <div className="overflow-hidden rounded-3xl border border-black/5 shadow-luxe dark:border-white/10">
              <iframe
                src={mapSrc}
                title="Veer Aluminium location"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
