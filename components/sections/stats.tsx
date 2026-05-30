"use client";

import { stats, whyChooseUs } from "@/lib/data";
import { Counter } from "@/components/counter";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,rgba(200,160,79,0.25),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(138,151,168,0.25),transparent_45%)]" />
      <div className="container-tight relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="heading-display mt-4 text-3xl sm:text-5xl">
            Numbers That Reflect Our <span className="text-gold-gradient">Commitment</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="glass-card p-8 text-center">
              <div className="font-display text-4xl font-bold text-gold-gradient sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm font-medium text-white/70">{s.label}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.08}>
              <div className="group flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold/40 hover:bg-white/[0.06]">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold transition group-hover:bg-gold group-hover:text-brand-950">
                  <Icon name={w.icon} size={22} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{w.title}</h3>
                  <p className="mt-1 text-sm text-white/65">{w.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
