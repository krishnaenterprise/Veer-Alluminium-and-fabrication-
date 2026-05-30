import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { services } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-brand-950 text-white">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-gold/20 blur-[120px]" />
      <div className="container-tight relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-gradient text-lg font-bold text-brand-950">V</span>
            <span className="font-display text-lg font-semibold">Veer Aluminium</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            Premium aluminium, glass & fabrication solutions engineered with precision for homes and businesses across Gujarat.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: Instagram, href: site.social.instagram },
              { icon: Facebook, href: site.social.facebook },
              { icon: Youtube, href: site.social.youtube },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-gold hover:text-gold"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Navigate</h4>
          <ul className="space-y-3 text-sm text-white/70">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-gold">{l.label}</Link>
              </li>
            ))}
            <li><Link href="/admin" className="transition hover:text-gold">Admin / CMS</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Services</h4>
          <ul className="space-y-3 text-sm text-white/70">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/#services`} className="transition hover:text-gold">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Get in Touch</h4>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-gold" /> {site.address.full}</li>
            <li className="flex gap-3"><Phone size={18} className="shrink-0 text-gold" /> <a href={`tel:${site.phoneRaw}`} className="hover:text-gold">{site.phone}</a></li>
            <li className="flex gap-3"><Mail size={18} className="shrink-0 text-gold" /> <a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></li>
            <li className="flex gap-3"><Clock size={18} className="shrink-0 text-gold" /> {site.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-tight flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Crafted with precision engineering in Palanpur, Gujarat.</p>
        </div>
      </div>
    </footer>
  );
}
