"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin, Maximize2 } from "lucide-react";
import { projects, projectCategories, type Project } from "@/lib/data";

export function ProjectGallery({ limit }: { limit?: number }) {
  const [active, setActive] = useState<(typeof projectCategories)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects
    .filter((p) => active === "All" || p.category === active)
    .slice(0, limit ?? projects.length);

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {projectCategories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              active === c
                ? "bg-gold-gradient text-brand-950 shadow-luxe-gold"
                : "border border-current/15 text-current/70 hover:border-gold hover:text-gold"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        <AnimatePresence>
          {filtered.map((p, i) => (
            <motion.button
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
              onClick={() => setSelected(p)}
              className="group relative block w-full overflow-hidden rounded-3xl text-left"
            >
              <div
                className={`w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${
                  i % 3 === 0 ? "h-80" : i % 3 === 1 ? "h-64" : "h-72"
                }`}
                style={{ backgroundImage: `url('${p.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/10 to-transparent opacity-90" />
              <div className="absolute inset-x-5 bottom-5">
                <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-semibold text-brand-950">{p.category}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
                  <MapPin size={13} /> {p.location}
                </p>
              </div>
              <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                <Maximize2 size={16} />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-brand-950/90 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white dark:bg-brand-900"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
              >
                <X size={18} />
              </button>
              <div className="h-72 w-full bg-cover bg-center sm:h-96" style={{ backgroundImage: `url('${selected.image}')` }} />
              <div className="p-7">
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-dark dark:text-gold-light">{selected.category}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold">{selected.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-current/60"><MapPin size={14} /> {selected.location}</p>
                <p className="mt-4 leading-relaxed text-current/70">{selected.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
