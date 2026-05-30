import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectGallery } from "@/components/project-gallery";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Our Projects & Portfolio",
  description:
    "Explore completed aluminium, glass, ACP and fabrication projects by Veer Aluminium across Palanpur and Gujarat — residential, commercial and industrial.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={<>Crafted Projects, <span className="text-gold-gradient">Lasting Impressions</span></>}
        subtitle="A showcase of our finest aluminium, glass, facade and fabrication work across Gujarat."
      />
      <section className="py-16 sm:py-24">
        <div className="container-tight">
          <ProjectGallery />
        </div>
      </section>
      <CTA />
    </>
  );
}
