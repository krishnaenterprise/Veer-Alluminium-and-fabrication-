import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";
import { timeline } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Veer Aluminium & Fabrication — 15+ years of precision engineering in aluminium, glass and fabrication across Palanpur and Gujarat.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={<>Built on <span className="text-gold-gradient">Precision & Trust</span></>}
        subtitle="From a specialised Palanpur workshop to a regional leader in aluminium, glass and fabrication."
        image="/images/about-hero.svg"
      />

      <section className="py-20 sm:py-28">
        <div className="container-tight grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">The Veer Standard</span>
            <h2 className="heading-display mt-4 text-3xl sm:text-4xl">
              Engineering spaces that stand the test of time
            </h2>
            <p className="mt-5 leading-relaxed text-current/65">
              Every project begins with careful measurement and ends with meticulous installation. Our
              integrated approach — design, fabrication and installation under one roof — means tighter
              quality control, faster delivery and a single point of accountability.
            </p>
            <p className="mt-4 leading-relaxed text-current/65">
              We invest in modern machinery, certified materials and continuous training so that whether
              you need a single window or an entire glass facade, you receive enterprise-grade quality.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="overflow-hidden rounded-[2rem] shadow-luxe">
            <div className="h-[440px] w-full bg-cover bg-center" style={{ backgroundImage: "url('/images/about-2.svg')" }} />
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12">
        <div className="container-tight">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our Journey</span>
            <h2 className="heading-display mt-4 text-3xl sm:text-5xl">Milestones That Shaped Us</h2>
          </Reveal>
          <div className="relative mx-auto mt-16 max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold via-gold/40 to-transparent sm:left-1/2" />
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.05}>
                <div className={`relative mb-10 flex flex-col gap-3 sm:flex-row sm:items-center ${i % 2 ? "sm:flex-row-reverse" : ""}`}>
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8">
                    <div className={`card-surface p-6 ${i % 2 ? "sm:text-left" : "sm:text-right"}`}>
                      <span className="font-display text-2xl font-bold text-gold-gradient">{t.year}</span>
                      <h3 className="mt-1 font-display text-lg font-semibold">{t.title}</h3>
                      <p className="mt-1 text-sm text-current/60">{t.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 top-2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-gold-gradient text-xs font-bold text-brand-950 sm:left-1/2">
                    {i + 1}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <Testimonials />
      <CTA />
    </>
  );
}
