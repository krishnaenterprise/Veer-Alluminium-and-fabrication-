import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/reveal";

const points = [
  "Precision manufacturing with CNC-cut profiles",
  "Certified materials & rigorous quality control",
  "Turnkey delivery — design, fabricate, install",
  "15+ years serving Palanpur & wider Gujarat",
];

export function AboutPreview() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-tight grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[2rem] shadow-luxe">
            <div
              className="h-[460px] w-full bg-cover bg-center"
              style={{ backgroundImage: "url('/images/about-1.svg')" }}
            />
          </div>
          <div className="absolute -bottom-8 -right-4 w-48 rounded-3xl bg-gold-gradient p-6 text-brand-950 shadow-luxe-gold sm:-right-8">
            <p className="font-display text-4xl font-bold">15+</p>
            <p className="mt-1 text-sm font-medium">Years of precision engineering</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="eyebrow">Who We Are</span>
          <h2 className="heading-display mt-4 text-3xl sm:text-5xl">
            Engineering Excellence in <span className="text-gold-gradient">Every Detail</span>
          </h2>
          <p className="mt-5 leading-relaxed text-current/65">
            Veer Aluminium & Fabrication has grown from a specialised workshop in Palanpur into a
            trusted regional leader in aluminium, glass and fabrication. We combine modern technology,
            skilled craftsmanship and disciplined project management to deliver results that last.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-gold" />
                <span className="text-current/80">{p}</span>
              </li>
            ))}
          </ul>
          <Link href="/about" className="btn-dark mt-9 text-xs">
            Discover Our Story <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
