import { expect, type Page } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async abrirPeloMenu(): Promise<void> {
    await this.page.getByRole('link', { name: 'Products' }).click();
  }

  async validarPaginaProdutosAberta(): Promise<void> {
    await expect(this.page).toHaveURL(/\/products$/);
    await expect(this.page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  }

  async validarListaProdutosVisivel(): Promise<void> {
    await expect(this.listaProdutos.first()).toBeVisible();
  }

  async abrirDetalheProduto(idProduto: number): Promise<void> {
    await this.page.locator(`a[href="/product_details/${idProduto}"]`).click();
  }

  async adicionarProdutoAoCarrinho(idProduto: number): Promise<void> {
    const produto = this.page.locator('.product-image-wrapper').filter({
      has: this.page.locator(`a[data-product-id="${idProduto}"]`),
    });

    await produto.first().hover();
    await produto.first().locator('.product-overlay a.add-to-cart').click();
  }

  async adicionarPrimeiroProdutoVisivelAoCarrinho(): Promise<void> {
    const produto = this.listaProdutos.first();

    await produto.hover();
    await produto.locator('.product-overlay a.add-to-cart').click();
  }

  async buscarProduto(nomeProduto: string): Promise<void> {
    await this.page.locator('#search_product').fill(nomeProduto);
    await this.page.locator('#submit_search').click({ force: true });
  }

  async validarProdutosBuscadosVisiveis(): Promise<void> {
    const tituloProdutosBuscados = this.page.getByRole('heading', {
      name: 'Searched Products',
    });

    await expect(async () => {
      if (!(await tituloProdutosBuscados.isVisible())) {
        await this.page.locator('#submit_search').dispatchEvent('click');
      }

      await expect(tituloProdutosBuscados).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 10000 });

    await this.validarListaProdutosVisivel();
  }

  async validarResultadoContemTexto(texto: string | RegExp): Promise<void> {
    await expect(this.listaProdutos.filter({ hasText: texto }).first()).toBeVisible();
  }

  async validarCategoriasVisiveis(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Category' })).toBeVisible();
  }

  async abrirCategoria(grupo: string, categoria: string): Promise<void> {
    await this.page.locator(`a[href="#${grupo}"]`).click();
    await this.page.locator(`#${grupo}`).getByRole('link', { name: categoria }).click();
  }

  async acessarCategoriaPorId(idCategoria: number): Promise<void> {
    await this.page.goto(`/category_products/${idCategoria}`);
  }

  async validarCategoriaAberta(idCategoria: number, titulo: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`/category_products/${idCategoria}$`));
    await expect(this.page.getByRole('heading', { name: titulo })).toBeVisible();
  }

  async validarMarcasVisiveis(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Brands' })).toBeVisible();
  }

  async abrirMarca(nomeMarca: string | RegExp): Promise<void> {
    await this.page.getByRole('link', { name: nomeMarca }).click();
  }

  async validarMarcaAberta(slugMarca: string, titulo: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`/brand_products/${slugMarca}$`));
    await expect(this.page.getByRole('heading', { name: titulo })).toBeVisible();
    await this.validarListaProdutosVisivel();
  }

  private get listaProdutos() {
    return this.page.locator('.features_items .product-image-wrapper');
  }
}
