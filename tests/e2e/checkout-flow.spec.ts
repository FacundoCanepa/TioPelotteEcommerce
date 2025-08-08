// tests/e2e/checkout-flow.spec.ts
import { test, expect } from '@playwright/test';

test('Flow compra: productos → carrito → checkout', async ({ page }) => {
  await page.goto('/');

  // Ir a Productos
  await Promise.all([
    page.waitForURL('**/productos**'),
    page.getByRole('link', { name: /productos/i }).click(),
  ]);

  // Ver producto
  await page.getByRole('link', { name: /ver producto/i }).first().click();
  await expect(page).toHaveURL(/\/productos\/.+/);

  // Agregar al carrito
  await page.getByRole('button', { name: /agregar|añadir al carrito/i }).click();

  // Ir al carrito
  await page.getByRole('link', { name: /carrito/i }).click();
  await expect(page).toHaveURL(/\/carrito/);

  // Ir a checkout
  await page.getByRole('link', { name: /checkout|finalizar compra/i }).click();
  await expect(page).toHaveURL(/\/checkout/);

  // Completar formulario (ajustar labels/roles exactos)
  await page.getByLabel(/nombre/i).fill('Juan Tester');
  await page.getByLabel(/tel[eé]fono/i).fill('2215550000');
  await page.getByLabel(/direcci[óo]n/i).fill('Calle Falsa 123');
  await page.getByLabel(/zona/i).selectOption({ label: 'Abasto' });

  // Método de pago
  const mp = page.getByLabel(/mercado pago/i);
  if (await mp.isVisible()) await mp.check();

  // Confirmar
  await page.getByRole('button', { name: /pagar|confirmar/i }).click();

  // Esperar página de éxito
  await page.waitForURL(/(success|gracias|approved)/, { timeout: 30_000 });
  await expect(page.getByText(/gracias por tu compra/i)).toBeVisible();
});
