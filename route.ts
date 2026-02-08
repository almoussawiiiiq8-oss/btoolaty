import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const password = String(body?.password ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected || password !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  // MVP: just return ok. Client stores local flag.
  return NextResponse.json({ ok: true });
}
