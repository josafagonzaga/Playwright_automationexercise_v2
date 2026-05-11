import { expect, type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async acessar(): Promise<void> {
    await this.page.goto('/');
  }

  async validarCarregada(): Promise<void> {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
    await expect(this.linkLoginCadastro).toBeVisible();
  }

  async acessarEValidar(): Promise<void> {
    await this.acessar();
    await this.validarCarregada();
  }

  async abrirLoginCadastro(): Promise<void> {
    await this.linkLoginCadastro.click();
  }

  async validarItensRecomendadosVisiveis(): Promise<void> {
    await this.itensRecomendados.scrollIntoViewIfNeeded();
    await expect(this.page.getByRole('heading', { name: 'Recommended Items' })).toBeVisible();
  }

  async adicionarPrimeiroItemRecomendadoAoCarrinho(): Promise<string> {
    const produtoRecomendado = this.page
      .locator('.recommended_items .item.active .product-image-wrapper')
      .first();
    const nomeProduto = await produtoRecomendado.locator('p').innerText();

    await produtoRecomendado.locator('a.add-to-cart').click();

    return nomeProduto;
  }

  async voltarAoTopoPelaSeta(): Promise<void> {
    await this.page.locator('#scrollUp').click();
  }

  async voltarAoTopoPorScroll(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async validarTextoPrincipalNoViewport(): Promise<void> {
    await expect(
      this.page.getByRole('heading', {
        name: 'Full-Fledged practice website for Automation Engineers',
      })
    ).toBeInViewport();
  }

  private get linkLoginCadastro() {
    return this.page.getByRole('link', { name: 'Signup / Login' });
  }

  private get itensRecomendados() {
    return this.page.locator('.recommended_items');
  }
}
