import { NextRequest, NextResponse } from "next/server";
import { addLead, getLeads } from "@/lib/store";
import { isAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const leads = await getLeads();
  return NextResponse.json({ leads });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.name || !body?.phone) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }
    const lead = await addLead({
      name: String(body.name).slice(0, 120),
      phone: String(body.phone).slice(0, 30),
      email: body.email ? String(body.email).slice(0, 160) : undefined,
      projectType: body.projectType ? String(body.projectType).slice(0, 120) : undefined,
      message: body.message ? String(body.message).slice(0, 2000) : undefined,
      estimatedCost: typeof body.estimatedCost === "number" ? body.estimatedCost : undefined,
    });
    return NextResponse.json({ ok: true, lead }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
