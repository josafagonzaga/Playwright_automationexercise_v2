import { expect, type Locator, type Page } from '@playwright/test';

type ProdutoCarrinhoEsperado = {
  id: number;
  nome: string;
  preco?: string;
  quantidade: string;
  total?: string;
};

export class CartPage {
  constructor(private readonly page: Page) {}

  async continuarComprando(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
    await expect(this.modalCarrinho).toBeHidden();
  }

  async abrirPeloModal(): Promise<void> {
    const linkVerCarrinho = this.modalCarrinho.getByRole('link', {
      name: 'View Cart',
    });

    if (await linkVerCarrinho.isVisible()) {
      await linkVerCarrinho.click();
    } else {
      await this.abrirPeloMenu();
      return;
    }

    await this.validarPaginaCarrinhoAberta();
  }

  async abrirPeloMenu(): Promise<void> {
    await this.page.locator('header a[href="/view_cart"]').click();
    await this.validarPaginaCarrinhoAberta();
  }

  async validarModalCarrinhoVisivel(): Promise<void> {
    await expect(this.modalCarrinho).toBeVisible();
  }

  async validarPaginaCarrinhoAberta(): Promise<void> {
    await expect(this.page).toHaveURL(/\/view_cart$/);
    await expect(this.page.locator('#cart_info')).toBeVisible();
  }

  async validarProduto(produto: ProdutoCarrinhoEsperado): Promise<void> {
    const linha = this.linhaProduto(produto.id);

    await expect(linha).toContainText(produto.nome);
    await expect(linha.locator('.cart_quantity')).toHaveText(produto.quantidade);

    if (produto.preco) {
      await expect(linha.locator('.cart_price')).toHaveText(produto.preco);
    }

    if (produto.total) {
      await expect(linha.locator('.cart_total')).toHaveText(produto.total);
    }
  }

  async validarConteudo(texto: string | RegExp): Promise<void> {
    await expect(this.page.locator('#cart_info')).toContainText(texto);
  }

  async removerProduto(produtoId: number): Promise<void> {
    await this.linhaProduto(produtoId).locator('.cart_quantity_delete').click();
  }

  async validarProdutoRemovido(produtoId: number): Promise<void> {
    await expect(this.linhaProduto(produtoId)).toBeHidden();
  }

  async validarCarrinhoVazio(): Promise<void> {
    await expect(this.page.getByText('Cart is empty!')).toBeVisible();
  }

  linhaProduto(produtoId: number): Locator {
    return this.page.locator(`#product-${produtoId}`);
  }

  private get modalCarrinho() {
    return this.page.locator('#cartModal');
  }
}
