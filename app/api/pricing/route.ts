import { NextRequest, NextResponse } from "next/server";
import { getPricing, setPricing } from "@/lib/store";
import { defaultPricing } from "@/lib/pricing";
import { isAdmin } from "@/lib/auth";

export async function GET() {
  const pricing = await getPricing();
  return NextResponse.json({ pricing });
}

export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    // Merge against defaults so partial updates stay valid.
    const merged = { ...defaultPricing, ...body.pricing };
    const saved = await setPricing(merged);
    return NextResponse.json({ ok: true, pricing: saved });
  } catch {
    return NextResponse.json({ error: "Invalid pricing payload." }, { status: 400 });
  }
}
