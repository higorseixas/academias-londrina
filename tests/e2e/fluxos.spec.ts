/**
 * Testes end-to-end dos principais fluxos de uso.
 * Cobertura: home, filtros, detalhes, 404 e página Sobre.
 */
import { test, expect } from "@playwright/test";

test.describe("Fluxos principais do Aplicativo de Academias", () => {
  test("home carrega lista com 15 academias", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Encontre a academia ideal/i })).toBeVisible();
    await expect(page.getByText(/15 academias? encontrada/i)).toBeVisible();
  });

  test("filtro por bairro reduz a lista", async ({ page }) => {
    await page.goto("/?bairro=Centro");
    const cards = page.locator('a[href^="/academias/"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(15);
  });

  test("abrir detalhes de uma academia", async ({ page }) => {
    await page.goto("/");
    await page.locator("a[href^='/academias/']").first().click();
    await expect(page.getByText("Voltar para a lista")).toBeVisible();
    await expect(page.locator("main h1").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /Endereço/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Contato/ })).toBeVisible();
  });

  test("ID inválido retorna 404 personalizada", async ({ page }) => {
    const resp = await page.goto("/academias/id-invalido-999");
    expect(resp?.status()).toBe(404);
    await expect(page.getByText(/Academia não encontrada/)).toBeVisible();
    await expect(page.getByRole("link", { name: /Voltar para a lista/i })).toBeVisible();
  });

  test("página Sobre renderiza informações do projeto", async ({ page }) => {
    await page.goto("/sobre");
    await expect(page.getByRole("heading", { name: /^Sobre o projeto$/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^Objetivo$/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^Funcionalidades$/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^Tecnologias$/ })).toBeVisible();
  });

  test("busca por termo livre funciona", async ({ page }) => {
    await page.goto("/?termo=Palhano");
    const cards = page.locator('a[href^="/academias/"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    const texts = await cards.allTextContents();
    expect(texts.some((t) => /Palhano/i.test(t))).toBe(true);
  });
});
