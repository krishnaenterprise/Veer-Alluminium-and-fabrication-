"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { productTypes } from "@/lib/pricing";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", projectType: "", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setState("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="card-surface grid place-items-center p-12 text-center">
        <CheckCircle2 className="text-green-500" size={48} />
        <h3 className="mt-4 font-display text-2xl font-semibold">Thank you!</h3>
        <p className="mt-2 text-current/60">Your enquiry has been received. Our team will reach out shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-surface p-7 sm:p-9">
      <h3 className="font-display text-2xl font-semibold">Request an Instant Quote</h3>
      <p className="mb-6 mt-1 text-sm text-current/55">Fill in the details and we’ll get back to you within hours.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label-field">Full Name *</label>
          <input required className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="label-field">Phone *</label>
          <input required className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div>
          <label className="label-field">Email</label>
          <input type="email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="label-field">Project Type</label>
          <select className="input-field" value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })}>
            <option value="">Select…</option>
            {productTypes.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="label-field">Message</label>
        <textarea rows={4} className="input-field resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project…" />
      </div>
      {state === "error" && <p className="mt-3 text-sm text-red-500">Something went wrong. Please try again or call us.</p>}
      <button disabled={state === "loading"} className="btn-gold mt-6 w-full disabled:opacity-60">
        {state === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        Send Enquiry
      </button>
    </form>
  );
}
