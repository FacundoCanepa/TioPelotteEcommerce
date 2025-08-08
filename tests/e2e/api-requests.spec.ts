import { test, expect } from '@playwright/test';

const api = [
  '/api/products?limit=12',
  '/api/categories',
  '/api/recetas?limit=8',
  '/api/zonas',
  '/api/pedidos',
  // agrega tus endpoints internos (pedidos, zonas, etc.)
];

test.describe('APIs responden', () => {
  for (const path of api) {
    test(`GET ${path}`, async ({ request, baseURL }) => {
      const t0 = Date.now();
      const res = await request.get(new URL(path, baseURL).toString());
      const ms = Date.now() - t0;

      expect(res.ok(), `Status ${res.status()} en ${path}`).toBeTruthy();
      expect(ms, `Lento (${ms}ms) en ${path}`).toBeLessThan(2000);
      // opcional: validar shape básico del JSON
      // const json = await res.json();
    });
  }
});