import { Reveal } from "./reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-20">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/85 to-brand-950/95" />
      </div>
      <div className="container-tight relative py-20 text-center text-white sm:py-28">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="heading-display mx-auto mt-4 max-w-3xl text-4xl sm:text-6xl">{title}</h1>
          {subtitle && <p className="mx-auto mt-5 max-w-2xl text-white/75">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
