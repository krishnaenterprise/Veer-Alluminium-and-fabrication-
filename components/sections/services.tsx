"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-tight">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">What We Build</span>
          <h2 className="heading-display mt-4 text-3xl sm:text-5xl">
            A Complete Suite of <span className="text-gold-gradient">Fabrication Services</span>
          </h2>
          <p className="mt-4 text-current/65">
            From precision aluminium systems to structural glazing and bespoke steel work — every
            solution engineered to enterprise standards.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_10px_40px_-24px_rgba(11,31,58,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-luxe dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="relative h-52 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-110"
                  style={{ backgroundImage: `url('${s.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />
                <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur-md transition group-hover:bg-gold group-hover:text-brand-950">
                  <Icon name={s.icon} size={22} />
                </div>
                <h3 className="absolute bottom-4 left-5 right-5 font-display text-xl font-semibold text-white">
                  {s.title}
                </h3>
              </div>

              <div className="p-6">
                <p className="text-sm leading-relaxed text-current/65">{s.short}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.features.slice(0, 3).map((f) => (
                    <span key={f} className="rounded-full bg-gold/10 px-3 py-1 text-[11px] font-medium text-gold-dark dark:text-gold-light">
                      {f}
                    </span>
                  ))}
                </div>
                <Link
                  href="/estimate"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-950 transition group-hover:gap-3 dark:text-white"
                >
                  Request Quote
                  <ArrowUpRight size={16} className="text-gold" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
