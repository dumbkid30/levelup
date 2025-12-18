import { NextResponse } from "next/server";
import { fetchLinkedInCompany } from "@/lib/rapidapi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json({ error: "Missing domain" }, { status: 400 });
  }

  try {
    const data = await fetchLinkedInCompany(domain);
    return NextResponse.json({ data });
  } catch (error) {
    console.error("LinkedIn company lookup failed:", error);
    return NextResponse.json({ error: "Lookup failed" }, { status: 502 });
  }
}
