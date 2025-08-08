// lib/flags.ts
import { statsigAdapter, type StatsigUser } from "@flags-sdk/statsig";
import { flag, dedupe } from "flags/next";
import type { Identify } from "flags";

// Usa las ENV que copiaste a .env.local
const serverSecret =
  process.env.FLAGS_SECRET || process.env.STATSIG_SERVER_SECRET;

if (!serverSecret) {
  // No detiene la app, pero te avisa en dev
  console.warn(
    "⚠️ Falta FLAGS_SECRET o STATSIG_SERVER_SECRET en .env.local (Statsig)"
  );
}

/**
 * Identidad base para segmentar (podés ampliar con userId real, zona, etc.)
 * OJO: corre en el servidor, no poner info sensible del cliente acá.
 */
export const identify = dedupe(async () => ({
  userID: "anon",
  // Ejemplo de atributos opcionales:
  // custom: { zona: "Abasto", rol: "guest" }
})) satisfies Identify<StatsigUser>;

/** Helper para crear feature flags booleans */
export const createFeatureFlag = (key: string) =>
  flag<boolean, StatsigUser>({
    key,
    adapter: statsigAdapter.featureGate((gate) => gate.value, {
      exposureLogging: true,
    }),
    identify,
  });

/** === Tus flags van acá === */
export const flagNuevoCarrusel = createFeatureFlag("nuevo_carrusel"); // ejemplo
export const flagSpeedHeader   = createFeatureFlag("speed_header");    // opcional
