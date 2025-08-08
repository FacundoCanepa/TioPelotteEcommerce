// app/api/flags/route.ts
import { NextResponse } from "next/server";
import { flagNuevoCarrusel, flagSpeedHeader } from "@/lib/flags";

export const runtime = "edge"; // rápido y barato

export async function POST(req: Request) {
  try {
    const { keys = [] } = await req.json();
    // Evaluá los flags que te pidan
    const entries: [string, boolean][] = [];

    for (const k of keys as string[]) {
      if (k === "nuevo_carrusel") entries.push([k, await flagNuevoCarrusel()]);
      if (k === "speed_header") entries.push([k, await flagSpeedHeader()]);
    }

    return NextResponse.json(Object.fromEntries(entries));
  } catch (e) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
