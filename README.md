# Veer Aluminium & Fabrication — Premium Enterprise Website

A world-class, enterprise-grade marketing & quotation website for **Veer Aluminium & Fabrication**
(Near Railway Overbridge, Ruppura, Palanpur, Gujarat – 385001).

Built to feel like a premium international construction & architecture brand — cinematic hero,
luxury parallax/scroll animations, a full quotation engine with PDF export, and a self-service
admin CMS the business owner can manage without touching code.

## ✨ Features

- **Cinematic landing page** — full-screen hero with slow-zoom + parallax, glassmorphism, scroll
  reveals, animated counters and magnetic micro-interactions (Framer Motion + Lenis smooth scroll).
- **Services showcase** — all 13 fabrication services with luxury hover cards.
- **Project portfolio** — filterable masonry gallery with full-screen lightbox popups.
- **Estimate Calculator** (the centrepiece) — product / material / glass / frame / dimension /
  add-on configurator with **live pricing**, GST breakdown, **professional PDF quotation export**,
  *save quote* (localStorage) and a lead-capture handoff.
- **Admin CMS** (`/admin`) — analytics dashboard (leads, conversion, revenue, charts), lead
  management with status pipeline, and **live pricing control** (changes instantly update every
  estimate).
- **Lead engine** — contact + estimate forms persist leads via API, visible in the CMS.
- **SEO** — dynamic metadata, LocalBusiness JSON-LD schema, `sitemap.xml`, `robots.txt`,
  OpenGraph/Twitter cards, targeted local keywords.
- **PWA-ready** web manifest, **dark/light mode**, WhatsApp + one-click-call floating actions,
  mobile-first responsive design.

## 🧱 Tech Stack

- **Next.js 15** (App Router) + **TypeScript**
- **TailwindCSS** design system + **Framer Motion** + **Lenis** smooth scroll
- **React Hook Form**-style controlled forms, **jsPDF** for quotation export
- **next-themes** for dark/light, **lucide-react** icons
- File-backed data store (`/data/store.json`) for leads + editable pricing — a drop-in
  interface (`lib/store.ts`) ready to swap for **PostgreSQL** in production.

## 🚀 Getting Started

```bash
npm install
cp .env.example .env.local   # set ADMIN_TOKEN
npm run dev                  # http://localhost:3000
```

Production:

```bash
npm run build && npm run start
```

## 🔐 Admin CMS

Visit **`/admin`** and sign in with the `ADMIN_TOKEN` (default `veer-admin` — change it in
`.env.local` for production). From here you can:

- View analytics (total/monthly leads, conversion rate, revenue, service popularity charts)
- Manage leads and move them through `New → Contacted → Quote Sent → Converted`
- Edit all pricing (aluminium/glass rates, labour, installation, transport, GST) — saved
  changes update the public estimate calculator instantly.

## 🗂️ Project Structure

```
app/            Routes (home, projects, estimate, about, contact, admin) + API + SEO files
components/     UI + section components (hero, services, gallery, calculator, admin, ...)
lib/            site config, content data, pricing engine, store, auth
data/           runtime JSON store (git-ignored)
```

## 🔄 Moving to PostgreSQL

`lib/store.ts` is the single integration point. Replace the JSON read/write helpers with SQL
queries against a `leads` table and a `settings` (pricing JSON) row — the rest of the app is
untouched. The pricing shape in `lib/pricing.ts` maps cleanly to a settings record.

## 📍 Business

**Veer Aluminium & Fabrication** · Near Railway Overbridge, Ruppura, Palanpur, Gujarat – 385001
