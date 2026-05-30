import { NextRequest, NextResponse } from "next/server";
import { updateLeadStatus, type LeadStatus } from "@/lib/store";
import { isAdmin } from "@/lib/auth";

const VALID: LeadStatus[] = ["New", "Contacted", "Quote Sent", "Converted"];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  if (!VALID.includes(body?.status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }
  const lead = await updateLeadStatus(id, body.status);
  if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  return NextResponse.json({ ok: true, lead });
}
