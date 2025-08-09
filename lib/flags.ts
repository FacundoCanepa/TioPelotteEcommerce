// lib/flags.ts
import { statsigAdapter, type StatsigUser } from "@flags-sdk/statsig";
import { flag, dedupe } from "flags/next";
import type { Identify } from "flags";

// Usá FLAGS_SECRET o STATSIG_SERVER_SECRET por env (no hace falta pasarlo al adapter)
if (!process.env.FLAGS_SECRET && !process.env.STATSIG_SERVER_SECRET) {
  console.warn("⚠️ Falta FLAGS_SECRET o STATSIG_SERVER_SECRET en .env.local (Statsig)");
}

// Identidad base (podés ampliarla luego)
export const identify = dedupe(async () => ({
  userID: "anon",
})) satisfies Identify<StatsigUser>;

// Helper para crear flags booleanos
export const createFeatureFlag = (key: string) =>
  flag<boolean, StatsigUser>({
    key,
    // 🔑 Usar el método estático directo del adapter
    adapter: statsigAdapter.featureGate(
      (gate: { value: boolean }) => gate.value,
      { exposureLogging: true }
    ),
    identify,
  });

// === Tus flags
export const flagNuevoCarrusel = createFeatureFlag("nuevo_carrusel");
