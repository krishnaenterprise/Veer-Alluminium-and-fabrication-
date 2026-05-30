import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { EstimateCalculator } from "@/components/estimate-calculator";

export const metadata: Metadata = {
  title: "Instant Estimate Calculator",
  description:
    "Get an instant, transparent estimate for aluminium windows, doors, glass, railings and ACP work. Configure your product and download a professional PDF quotation.",
};

export default function EstimatePage() {
  return (
    <>
      <PageHero
        eyebrow="Smart Quotation Engine"
        title={<>Instant <span className="text-gold-gradient">Estimate Calculator</span></>}
        subtitle="Configure your product, see transparent pricing in real time, and download a professional PDF quotation — completely free."
        image="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-16 sm:py-20">
        <div className="container-tight">
          <EstimateCalculator />
        </div>
      </section>
    </>
  );
}
