import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectGallery } from "@/components/project-gallery";
import { Reveal } from "@/components/reveal";

export function ProjectsPreview() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-tight">
        <Reveal className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <div className="max-w-2xl">
            <span className="eyebrow">Our Portfolio</span>
            <h2 className="heading-display mt-4 text-3xl sm:text-5xl">
              Projects That <span className="text-gold-gradient">Speak For Themselves</span>
            </h2>
          </div>
          <Link href="/projects" className="btn-dark shrink-0 text-xs">
            View All Projects <ArrowRight size={16} />
          </Link>
        </Reveal>

        <div className="mt-14">
          <ProjectGallery limit={6} />
        </div>
      </div>
    </section>
  );
}
