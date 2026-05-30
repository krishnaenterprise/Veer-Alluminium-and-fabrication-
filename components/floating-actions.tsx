"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {show && (
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="grid h-11 w-11 place-items-center rounded-full border border-current/15 bg-[rgb(var(--bg))]/80 backdrop-blur transition hover:text-gold"
        >
          <ArrowUp size={18} />
        </button>
      )}
      <a
        href={`tel:${site.phoneRaw}`}
        aria-label="Call now"
        className="grid h-12 w-12 place-items-center rounded-full bg-brand-950 text-white shadow-luxe transition hover:scale-105 dark:bg-white dark:text-brand-950"
      >
        <Phone size={20} />
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,0.6)] transition hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        <MessageCircle size={24} className="relative" />
      </a>
    </div>
  );
}
