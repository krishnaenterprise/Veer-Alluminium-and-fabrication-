"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Star, ShieldCheck } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background image with slow zoom + parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div
          className="h-full w-full animate-slow-zoom bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80')",
          }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-brand-950/55 to-brand-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/80 to-transparent" />
      {/* Floating glass reflection accents */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 animate-float rounded-full bg-gold/20 blur-[100px]" />
      <div className="pointer-events-none absolute right-10 top-1/3 h-80 w-80 animate-float rounded-full bg-steel/20 blur-[120px]" style={{ animationDelay: "2s" }} />

      <motion.div style={{ opacity }} className="container-tight relative flex h-full flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
            <ShieldCheck size={14} className="text-gold" /> 15+ Years of Trust
          </span>
          <span className="hidden items-center gap-1 text-sm text-white/80 sm:flex">
            <Star size={14} className="fill-gold text-gold" />
            <Star size={14} className="fill-gold text-gold" />
            <Star size={14} className="fill-gold text-gold" />
            <Star size={14} className="fill-gold text-gold" />
            <Star size={14} className="fill-gold text-gold" />
            <span className="ml-1">950+ Happy Clients</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="heading-display max-w-4xl text-4xl text-white sm:text-6xl lg:text-7xl"
        >
          Transforming Spaces With{" "}
          <span className="text-gold-gradient">Premium Aluminium</span> & Glass Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          Trusted aluminium, glass & fabrication experts serving Gujarat with precision engineering
          and modern design — from luxury homes to commercial towers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link href="/estimate" className="btn-gold group">
            Get Free Estimate
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/projects" className="btn-outline group">
            <Play size={16} className="text-gold" /> View Projects
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-gold"
          />
        </div>
      </div>
    </section>
  );
}
