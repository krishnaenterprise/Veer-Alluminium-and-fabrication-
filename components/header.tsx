"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgb(var(--bg))]/85 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(11,31,58,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-tight flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-gradient text-lg font-bold text-brand-950 shadow-luxe-gold">
            V
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-tight">Veer Aluminium</span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gold">& Fabrication</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-current/75 transition hover:text-current"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-gold-gradient transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href={`tel:${site.phoneRaw}`} className="hidden items-center gap-2 text-sm font-semibold md:flex">
            <Phone size={15} className="text-gold" /> {site.phone}
          </a>
          <Link href="/estimate" className="btn-gold hidden text-xs md:inline-flex">
            Get Free Estimate
          </Link>
          <button
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-current/15 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-tight flex h-20 items-center justify-between">
              <span className="font-display text-lg font-semibold text-white">Menu</span>
              <button
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <nav className="container-tight mt-6 flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 font-display text-2xl text-white"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link href="/estimate" onClick={() => setOpen(false)} className="btn-gold mt-6">
                Get Free Estimate
              </Link>
              <a href={`tel:${site.phoneRaw}`} className="btn-outline mt-3">
                <Phone size={16} /> Call {site.phone}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
