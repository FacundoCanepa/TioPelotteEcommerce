import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/productos',
  '/historia',
  '/ubicacion',
  '/recetas',
  '/cart',
  '/checkout',
  '/consultarPedido',
  '/login',
  '/register',
  '/reset-password',
  // agrega otras que tengas (blog, contacto, etc.)
];

test.describe('Smoke pages', () => {
  for (const path of routes) {
    test(`GET ${path} responde y no rompe`, async ({ page, baseURL }) => {
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(String(err)));
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      await page.goto(path, { waitUntil: 'networkidle' });

      // status 200/OK
      const resp = await page.request.get(new URL(path, baseURL).toString());
      expect(resp.ok()).toBeTruthy();

      // no errores de consola
      expect(errors, `Errores en ${path}:\n${errors.join('\n')}`).toHaveLength(0);
    });
  }
});