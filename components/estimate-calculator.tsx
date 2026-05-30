"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Download, Save, Send, CheckCircle2, Loader2 } from "lucide-react";
import {
  calculateEstimate, defaultPricing, formatINR, productTypes, aluminiumGrades,
  glassTypes, frameFinishes, addOnList, type EstimateInput, type Pricing,
} from "@/lib/pricing";
import { site } from "@/lib/site";

type AddOnKey = (typeof addOnList)[number]["value"];

export function EstimateCalculator() {
  const [pricing, setPricing] = useState<Pricing>(defaultPricing);
  const [input, setInput] = useState<EstimateInput>({
    product: "Sliding Window",
    aluminiumGrade: "premium",
    glassType: "toughened",
    frame: "white",
    widthFt: 5,
    heightFt: 4,
    quantity: 1,
    addOns: { mosquitoMesh: true },
  });

  // Pull live pricing from the CMS-backed API (falls back to defaults).
  useEffect(() => {
    fetch("/api/pricing")
      .then((r) => r.json())
      .then((d) => d?.pricing && setPricing(d.pricing))
      .catch(() => {});
  }, []);

  const result = useMemo(() => calculateEstimate(input, pricing), [input, pricing]);

  const set = <K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) =>
    setInput((p) => ({ ...p, [key]: value }));

  const toggleAddOn = (key: AddOnKey) =>
    setInput((p) => ({ ...p, addOns: { ...p.addOns, [key]: !p.addOns[key] } }));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      {/* ---------------- Configurator ---------------- */}
      <div className="card-surface p-7 sm:p-9">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold">
            <Calculator size={22} />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold">Configure Your Product</h2>
            <p className="text-sm text-current/55">Adjust options to see live pricing.</p>
          </div>
        </div>

        <Field label="Product Type">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {productTypes.map((p) => (
              <Chip key={p} active={input.product === p} onClick={() => set("product", p)}>
                {p}
              </Chip>
            ))}
          </div>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Aluminium Grade">
            <select className="input-field" value={input.aluminiumGrade} onChange={(e) => set("aluminiumGrade", e.target.value as EstimateInput["aluminiumGrade"])}>
              {aluminiumGrades.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </Field>
          <Field label="Glass Type">
            <select className="input-field" value={input.glassType} onChange={(e) => set("glassType", e.target.value as EstimateInput["glassType"])}>
              {glassTypes.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Frame Finish">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {frameFinishes.map((f) => (
              <Chip key={f.value} active={input.frame === f.value} onClick={() => set("frame", f.value as EstimateInput["frame"])}>
                {f.label}
              </Chip>
            ))}
          </div>
        </Field>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Width (ft)">
            <input type="number" min={0} step={0.5} className="input-field" value={input.widthFt}
              onChange={(e) => set("widthFt", Math.max(0, +e.target.value))} />
          </Field>
          <Field label="Height (ft)">
            <input type="number" min={0} step={0.5} className="input-field" value={input.heightFt}
              onChange={(e) => set("heightFt", Math.max(0, +e.target.value))} />
          </Field>
          <Field label="Quantity">
            <input type="number" min={1} step={1} className="input-field" value={input.quantity}
              onChange={(e) => set("quantity", Math.max(1, Math.floor(+e.target.value)))} />
          </Field>
        </div>

        <div className="mt-1 rounded-xl bg-gold/10 px-4 py-2.5 text-sm text-gold-dark dark:text-gold-light">
          Area = {input.widthFt} × {input.heightFt} × {input.quantity} = <strong>{result.area} sq.ft</strong>
        </div>

        <Field label="Additional Options" className="mt-6">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {addOnList.map((a) => (
              <Chip key={a.value} active={!!input.addOns[a.value]} onClick={() => toggleAddOn(a.value)}>
                {a.label}
              </Chip>
            ))}
          </div>
        </Field>
      </div>

      {/* ---------------- Live Quote ---------------- */}
      <QuotePanel input={input} pricing={pricing} result={result} />
    </div>
  );
}

function QuotePanel({
  input, pricing, result,
}: {
  input: EstimateInput;
  pricing: Pricing;
  result: ReturnType<typeof calculateEstimate>;
}) {
  const [saved, setSaved] = useState(false);
  const rows: [string, number][] = [
    ["Estimated Material Cost", result.materialCost],
    ["Labour Cost", result.labourCost],
    ["Installation Cost", result.installationCost],
    ["Transportation Cost", result.transportationCost],
  ];

  const generatePDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    const gold: [number, number, number] = [200, 160, 79];
    const navy: [number, number, number] = [11, 31, 58];

    doc.setFillColor(...navy);
    doc.rect(0, 0, W, 90, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Veer Aluminium & Fabrication", 40, 45);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(site.address.full, 40, 62);
    doc.text(`${site.phone}  |  ${site.email}`, 40, 76);

    doc.setTextColor(...gold);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("QUOTATION ESTIMATE", 40, 130);
    doc.setTextColor(90, 90, 90);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString("en-IN")}`, W - 40, 130, { align: "right" });
    doc.text(`Ref: VAF-${Date.now().toString(36).toUpperCase()}`, W - 40, 145, { align: "right" });

    let y = 175;
    const specs: [string, string][] = [
      ["Product Type", input.product],
      ["Aluminium Grade", input.aluminiumGrade],
      ["Glass Type", input.glassType],
      ["Frame Finish", input.frame],
      ["Dimensions", `${input.widthFt}ft x ${input.heightFt}ft`],
      ["Quantity", String(input.quantity)],
      ["Total Area", `${result.area} sq.ft`],
      ["Add-ons", Object.entries(input.addOns).filter(([, v]) => v).map(([k]) => k).join(", ") || "None"],
    ];
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "bold");
    doc.text("Specification", 40, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    specs.forEach(([k, v]) => {
      doc.text(`${k}:`, 40, y);
      doc.text(String(v), 200, y);
      y += 16;
    });

    y += 14;
    doc.setDrawColor(220, 220, 220);
    doc.line(40, y, W - 40, y);
    y += 22;

    const lines: [string, number][] = [
      ["Estimated Material Cost", result.materialCost],
      ["Labour Cost", result.labourCost],
      ["Installation Cost", result.installationCost],
      ["Transportation Cost", result.transportationCost],
      ["Sub Total", result.subTotal],
      [`GST (${pricing.gstPercent}%)`, result.gst],
    ];
    doc.setFontSize(11);
    lines.forEach(([k, v]) => {
      doc.setTextColor(60, 60, 60);
      doc.text(k, 40, y);
      doc.text(formatINR(v), W - 40, y, { align: "right" });
      y += 20;
    });

    y += 6;
    doc.setFillColor(...gold);
    doc.rect(40, y - 14, W - 80, 32, "F");
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("GRAND TOTAL", 52, y + 6);
    doc.text(formatINR(result.grandTotal), W - 52, y + 6, { align: "right" });

    y += 60;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(130, 130, 130);
    doc.text("This is a computer-generated estimate and is indicative. Final pricing is confirmed after site measurement.", 40, y);
    doc.text("Thank you for choosing Veer Aluminium & Fabrication.", 40, y + 14);

    doc.save(`Veer-Aluminium-Quotation-${Date.now().toString(36)}.pdf`);
  };

  const saveQuote = () => {
    try {
      const list = JSON.parse(localStorage.getItem("veer_saved_quotes") || "[]");
      list.unshift({ input, result, at: new Date().toISOString() });
      localStorage.setItem("veer_saved_quotes", JSON.stringify(list.slice(0, 20)));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {}
  };

  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <motion.div layout className="overflow-hidden rounded-3xl bg-brand-950 text-white shadow-luxe">
        <div className="bg-gold-gradient px-7 py-5 text-brand-950">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">Your Estimate</p>
          <p className="font-display text-4xl font-bold">{formatINR(result.grandTotal)}</p>
          <p className="text-xs font-medium opacity-80">{formatINR(result.perUnit)} per unit · incl. {pricing.gstPercent}% GST</p>
        </div>

        <div className="space-y-3 px-7 py-6 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between text-white/75">
              <span>{label}</span>
              <span className="font-medium text-white">{formatINR(value)}</span>
            </div>
          ))}
          <div className="my-3 h-px bg-white/10" />
          <div className="flex items-center justify-between text-white/75">
            <span>Sub Total</span>
            <span className="font-medium text-white">{formatINR(result.subTotal)}</span>
          </div>
          <div className="flex items-center justify-between text-white/75">
            <span>GST ({pricing.gstPercent}%)</span>
            <span className="font-medium text-white">{formatINR(result.gst)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
            <span className="font-semibold">Grand Total</span>
            <span className="font-display text-xl font-bold text-gold-light">{formatINR(result.grandTotal)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 px-7 pb-7">
          <button onClick={generatePDF} className="btn bg-white text-brand-950 hover:-translate-y-0.5">
            <Download size={16} /> PDF
          </button>
          <button onClick={saveQuote} className="btn border border-white/25 text-white hover:bg-white/10">
            {saved ? <CheckCircle2 size={16} className="text-green-400" /> : <Save size={16} />} {saved ? "Saved" : "Save"}
          </button>
        </div>
      </motion.div>

      <LeadForm input={input} estimatedCost={result.grandTotal} />
    </div>
  );
}

function LeadForm({ input, estimatedCost }: { input: EstimateInput; estimatedCost: number }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setState("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, projectType: input.product, estimatedCost }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="mt-5 rounded-3xl border border-green-500/30 bg-green-500/10 p-6 text-center">
        <CheckCircle2 className="mx-auto text-green-500" size={32} />
        <p className="mt-3 font-semibold">Quote request received!</p>
        <p className="mt-1 text-sm text-current/60">Our team will call you shortly with a confirmed quotation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-surface mt-5 p-6">
      <p className="font-display text-lg font-semibold">Get this quote confirmed</p>
      <p className="mb-4 text-sm text-current/55">Share your details — we’ll send a final quotation.</p>
      <div className="space-y-3">
        <input required placeholder="Full Name" className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required placeholder="Phone Number" className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input type="email" placeholder="Email (optional)" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      {state === "error" && <p className="mt-2 text-sm text-red-500">Something went wrong. Please try again.</p>}
      <button disabled={state === "loading"} className="btn-gold mt-4 w-full disabled:opacity-60">
        {state === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        Request Final Quote
      </button>
    </form>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`mb-6 ${className}`}>
      <span className="label-field">{label}</span>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
        active
          ? "border-gold bg-gold/15 text-gold-dark dark:text-gold-light"
          : "border-black/10 text-current/70 hover:border-gold/50 dark:border-white/15"
      }`}
    >
      {children}
    </button>
  );
}
