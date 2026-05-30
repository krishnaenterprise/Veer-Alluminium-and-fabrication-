import Link from "next/link";
import { ArrowRight, Calculator, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function CTA() {
  return (
    <section className="py-12">
      <div className="container-tight">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-950 px-8 py-16 text-center text-white sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_20%,rgba(200,160,79,0.35),transparent_50%),radial-gradient(circle_at_75%_80%,rgba(138,151,168,0.3),transparent_50%)]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-10 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/cta.svg')" }}
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="eyebrow">Start Your Project</span>
              <h2 className="heading-display mt-4 text-3xl sm:text-5xl">
                Ready to Transform Your Space?
              </h2>
              <p className="mt-4 text-white/70">
                Get an instant, transparent estimate with our smart quotation engine — or talk to our
                experts directly. No obligation, completely free.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link href="/estimate" className="btn-gold group">
                  <Calculator size={18} /> Get Free Estimate
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a href={`tel:${site.phoneRaw}`} className="btn-outline">
                  <Phone size={16} className="text-gold" /> {site.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
