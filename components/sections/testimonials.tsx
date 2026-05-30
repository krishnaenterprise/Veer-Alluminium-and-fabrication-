"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];
  const go = (dir: number) => setIdx((p) => (p + dir + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 sm:py-32">
      <div className="container-tight">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Client Voices</span>
          <h2 className="heading-display mt-4 text-3xl sm:text-5xl">
            Trusted by <span className="text-gold-gradient">Homes & Businesses</span>
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-3xl">
          <Quote className="mx-auto mb-6 text-gold" size={48} />
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="mb-5 flex justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={20} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="font-display text-xl leading-relaxed sm:text-2xl">“{t.quote}”</p>
              <div className="mt-7">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-current/55">{t.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button onClick={() => go(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-current/15 transition hover:border-gold hover:text-gold">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-gold" : "w-2 bg-current/20"}`}
                />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-current/15 transition hover:border-gold hover:text-gold">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
