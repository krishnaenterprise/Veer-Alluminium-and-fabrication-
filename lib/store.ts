// Lightweight file-backed store for leads + editable pricing.
// In production this should be swapped for PostgreSQL (the shape maps cleanly
// to two tables: `leads` and a `settings` JSON row). The interface below is the
// single integration point, so swapping the backend touches only this file.

import { promises as fs } from "fs";
import path from "path";
import { defaultPricing, type Pricing } from "./pricing";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");

export type LeadStatus = "New" | "Contacted" | "Quote Sent" | "Converted";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  projectType?: string;
  message?: string;
  estimatedCost?: number;
  status: LeadStatus;
  createdAt: string;
};

type Store = {
  pricing: Pricing;
  leads: Lead[];
};

async function ensureStore(): Promise<Store> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<Store>;
    return {
      pricing: { ...defaultPricing, ...(parsed.pricing ?? {}) },
      leads: parsed.leads ?? [],
    };
  } catch {
    const initial: Store = { pricing: defaultPricing, leads: [] };
    await persist(initial);
    return initial;
  }
}

async function persist(store: Store) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

export async function getPricing(): Promise<Pricing> {
  return (await ensureStore()).pricing;
}

export async function setPricing(pricing: Pricing): Promise<Pricing> {
  const store = await ensureStore();
  store.pricing = pricing;
  await persist(store);
  return store.pricing;
}

export async function getLeads(): Promise<Lead[]> {
  const store = await ensureStore();
  return [...store.leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addLead(input: Omit<Lead, "id" | "status" | "createdAt"> & { status?: LeadStatus }): Promise<Lead> {
  const store = await ensureStore();
  const lead: Lead = {
    id: "L" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    status: input.status ?? "New",
    createdAt: new Date().toISOString(),
    name: input.name,
    phone: input.phone,
    email: input.email,
    projectType: input.projectType,
    message: input.message,
    estimatedCost: input.estimatedCost,
  };
  store.leads.push(lead);
  await persist(store);
  return lead;
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead | null> {
  const store = await ensureStore();
  const lead = store.leads.find((l) => l.id === id);
  if (!lead) return null;
  lead.status = status;
  await persist(store);
  return lead;
}
