"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, Users, IndianRupee, LogOut, Lock, Loader2, TrendingUp,
  RefreshCw, Save, CheckCircle2,
} from "lucide-react";
import { defaultPricing, formatINR, type Pricing } from "@/lib/pricing";
import type { Lead, LeadStatus } from "@/lib/store";

const STATUSES: LeadStatus[] = ["New", "Contacted", "Quote Sent", "Converted"];
const TOKEN_KEY = "veer_admin_token";

export function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<"overview" | "leads" | "pricing">("overview");

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN_KEY));
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    // Validate by attempting an authenticated request.
    const res = await fetch("/api/leads", { headers: { Authorization: `Bearer ${input}` } });
    if (res.ok) {
      localStorage.setItem(TOKEN_KEY, input);
      setToken(input);
    } else {
      setErr("Invalid access token. Try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setInput("");
  };

  if (!token) {
    return (
      <div className="container-tight grid min-h-[70vh] place-items-center py-24">
        <form onSubmit={login} className="card-surface w-full max-w-md p-8">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/15 text-gold">
            <Lock size={26} />
          </div>
          <h1 className="mt-5 font-display text-2xl font-semibold">Admin CMS Login</h1>
          <p className="mt-1 text-sm text-current/55">Enter your access token to manage content, pricing and leads.</p>
          <input
            type="password"
            placeholder="Access token"
            className="input-field mt-6"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {err && <p className="mt-2 text-sm text-red-500">{err}</p>}
          <button className="btn-gold mt-5 w-full">Sign In</button>
          <p className="mt-4 text-center text-xs text-current/40">Demo token: <code className="font-mono">veer-admin</code> · set <code>ADMIN_TOKEN</code> in production.</p>
        </form>
      </div>
    );
  }

  return (
    <div className="container-tight py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Enterprise CMS</h1>
          <p className="text-sm text-current/55">Manage leads, pricing & analytics in real time.</p>
        </div>
        <button onClick={logout} className="btn border border-current/15 text-sm hover:border-red-400 hover:text-red-500">
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <div className="mb-8 flex gap-2 overflow-x-auto no-scrollbar">
        {([
          { id: "overview", label: "Analytics", icon: LayoutDashboard },
          { id: "leads", label: "Leads", icon: Users },
          { id: "pricing", label: "Pricing", icon: IndianRupee },
        ] as const).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`btn shrink-0 text-sm ${tab === id ? "bg-gold-gradient text-brand-950" : "border border-current/15 text-current/70"}`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      {tab === "overview" && <Overview token={token} />}
      {tab === "leads" && <LeadsPanel token={token} />}
      {tab === "pricing" && <PricingPanel token={token} />}
    </div>
  );
}

function useLeads(token: string) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/leads", { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json().catch(() => ({ leads: [] }));
    setLeads(data.leads || []);
    setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);
  return { leads, loading, reload: load, setLeads };
}

function Overview({ token }: { token: string }) {
  const { leads, loading } = useLeads(token);

  const metrics = useMemo(() => {
    const total = leads.length;
    const now = new Date();
    const monthly = leads.filter((l) => {
      const d = new Date(l.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    const converted = leads.filter((l) => l.status === "Converted").length;
    const conversion = total ? Math.round((converted / total) * 100) : 0;
    const revenue = leads.filter((l) => l.status === "Converted").reduce((s, l) => s + (l.estimatedCost || 0), 0);

    const productCount: Record<string, number> = {};
    leads.forEach((l) => {
      const p = l.projectType || "Unspecified";
      productCount[p] = (productCount[p] || 0) + 1;
    });
    const popular = Object.entries(productCount).sort((a, b) => b[1] - a[1]);
    const topProduct = popular[0]?.[0] || "—";

    // last 6 months enquiry counts
    const months: { label: string; count: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const count = leads.filter((l) => {
        const ld = new Date(l.createdAt);
        return ld.getMonth() === d.getMonth() && ld.getFullYear() === d.getFullYear();
      }).length;
      months.push({ label: d.toLocaleString("en", { month: "short" }), count });
    }

    return { total, monthly, conversion, revenue, topProduct, popular, months };
  }, [leads]);

  if (loading) return <Loading />;

  const cards = [
    { label: "Total Leads", value: String(metrics.total), icon: Users },
    { label: "Leads This Month", value: String(metrics.monthly), icon: TrendingUp },
    { label: "Conversion Rate", value: `${metrics.conversion}%`, icon: TrendingUp },
    { label: "Revenue (Converted)", value: formatINR(metrics.revenue), icon: IndianRupee },
  ];
  const maxMonth = Math.max(1, ...metrics.months.map((m) => m.count));
  const maxPop = Math.max(1, ...metrics.popular.map(([, c]) => c));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="card-surface p-6">
            <c.icon className="text-gold" size={22} />
            <p className="mt-4 font-display text-3xl font-bold">{c.value}</p>
            <p className="text-sm text-current/55">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <h3 className="font-display text-lg font-semibold">Monthly Enquiries</h3>
          <div className="mt-6 flex h-48 items-end gap-3">
            {metrics.months.map((m) => (
              <div key={m.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg bg-gold-gradient transition-all"
                    style={{ height: `${(m.count / maxMonth) * 100}%`, minHeight: m.count ? 6 : 2 }}
                  />
                </div>
                <span className="text-xs text-current/50">{m.label}</span>
                <span className="text-xs font-semibold">{m.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-6">
          <h3 className="font-display text-lg font-semibold">Service Popularity</h3>
          <p className="mt-1 text-xs text-current/50">Most requested: <strong className="text-gold-dark dark:text-gold-light">{metrics.topProduct}</strong></p>
          <div className="mt-5 space-y-3">
            {metrics.popular.length === 0 && <p className="text-sm text-current/50">No data yet.</p>}
            {metrics.popular.slice(0, 6).map(([name, count]) => (
              <div key={name}>
                <div className="mb-1 flex justify-between text-xs">
                  <span>{name}</span>
                  <span className="font-semibold">{count}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-current/10">
                  <div className="h-2 rounded-full bg-gold-gradient" style={{ width: `${(count / maxPop) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadsPanel({ token }: { token: string }) {
  const { leads, loading, reload, setLeads } = useLeads(token);

  const changeStatus = async (id: string, status: LeadStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="card-surface overflow-hidden">
      <div className="flex items-center justify-between border-b border-current/10 p-5">
        <h3 className="font-display text-lg font-semibold">Lead Management ({leads.length})</h3>
        <button onClick={reload} className="btn border border-current/15 text-xs"><RefreshCw size={14} /> Refresh</button>
      </div>
      {leads.length === 0 ? (
        <p className="p-10 text-center text-sm text-current/50">No leads yet. Submit the contact or estimate form to see leads here.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-current/5 text-left text-xs uppercase tracking-wider text-current/50">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Project</th>
                <th className="p-4">Est. Cost</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-current/5">
                  <td className="p-4 font-medium">{l.name}</td>
                  <td className="p-4 text-current/70">
                    <div>{l.phone}</div>
                    {l.email && <div className="text-xs text-current/45">{l.email}</div>}
                  </td>
                  <td className="p-4 text-current/70">{l.projectType || "—"}</td>
                  <td className="p-4 text-current/70">{l.estimatedCost ? formatINR(l.estimatedCost) : "—"}</td>
                  <td className="p-4 text-current/50">{new Date(l.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="p-4">
                    <select
                      value={l.status}
                      onChange={(e) => changeStatus(l.id, e.target.value as LeadStatus)}
                      className="rounded-lg border border-current/15 bg-transparent px-2 py-1.5 text-xs"
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PricingPanel({ token }: { token: string }) {
  const [pricing, setPricing] = useState<Pricing>(defaultPricing);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/pricing").then((r) => r.json()).then((d) => {
      if (d?.pricing) setPricing(d.pricing);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/pricing", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ pricing }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <Loading />;

  const num = (v: string) => Math.max(0, +v || 0);

  return (
    <div className="space-y-6">
      <div className="card-surface p-6">
        <h3 className="font-display text-lg font-semibold">Aluminium — Rate per sq.ft</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <PriceInput label="Standard" value={pricing.aluminium.standard} onChange={(v) => setPricing({ ...pricing, aluminium: { ...pricing.aluminium, standard: num(v) } })} />
          <PriceInput label="Premium" value={pricing.aluminium.premium} onChange={(v) => setPricing({ ...pricing, aluminium: { ...pricing.aluminium, premium: num(v) } })} />
          <PriceInput label="Heavy Duty" value={pricing.aluminium.heavyDuty} onChange={(v) => setPricing({ ...pricing, aluminium: { ...pricing.aluminium, heavyDuty: num(v) } })} />
        </div>
      </div>

      <div className="card-surface p-6">
        <h3 className="font-display text-lg font-semibold">Glass — Rate per sq.ft</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {(Object.keys(pricing.glass) as (keyof Pricing["glass"])[]).map((k) => (
            <PriceInput key={k} label={k} value={pricing.glass[k]} onChange={(v) => setPricing({ ...pricing, glass: { ...pricing.glass, [k]: num(v) } })} />
          ))}
        </div>
      </div>

      <div className="card-surface p-6">
        <h3 className="font-display text-lg font-semibold">Labour, Installation, Transport & GST</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <PriceInput label="Labour /sq.ft" value={pricing.labourPerSqft} onChange={(v) => setPricing({ ...pricing, labourPerSqft: num(v) })} />
          <PriceInput label="Installation /sq.ft" value={pricing.installationPerSqft} onChange={(v) => setPricing({ ...pricing, installationPerSqft: num(v) })} />
          <PriceInput label="Transport (flat)" value={pricing.transportFlat} onChange={(v) => setPricing({ ...pricing, transportFlat: num(v) })} />
          <PriceInput label="GST %" value={pricing.gstPercent} onChange={(v) => setPricing({ ...pricing, gstPercent: num(v) })} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={save} disabled={saving} className="btn-gold disabled:opacity-60">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Pricing
        </button>
        {saved && <span className="flex items-center gap-1.5 text-sm text-green-600"><CheckCircle2 size={16} /> Saved — estimates updated live.</span>}
      </div>
    </div>
  );
}

function PriceInput({ label, value, onChange }: { label: string; value: number; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="label-field capitalize">{label}</label>
      <input type="number" className="input-field" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Loading() {
  return (
    <div className="grid place-items-center py-20 text-current/50">
      <Loader2 className="animate-spin" size={28} />
    </div>
  );
}
