import type { Page } from '@playwright/test';
import { CartPage } from '../pages/cart-page';
import { ProductsPage } from '../pages/products-page';

export async function abrirProdutos(page: Page): Promise<void> {
  const productsPage = new ProductsPage(page);

  await productsPage.abrirPeloMenu();
  await productsPage.validarPaginaProdutosAberta();
}

export async function adicionarProdutoAoCarrinho(page: Page, produtoId: number): Promise<void> {
  await new ProductsPage(page).adicionarProdutoAoCarrinho(produtoId);
  await new CartPage(page).validarModalCarrinhoVisivel();
}

export async function continuarComprando(page: Page): Promise<void> {
  await new CartPage(page).continuarComprando();
}

export async function verCarrinhoPeloModal(page: Page): Promise<void> {
  await new CartPage(page).abrirPeloModal();
}

export async function abrirCarrinho(page: Page): Promise<void> {
  await new CartPage(page).abrirPeloMenu();
}

export async function validarPaginaCarrinho(page: Page): Promise<void> {
  await new CartPage(page).validarPaginaCarrinhoAberta();
}

export async function adicionarPrimeiroProdutoAoCarrinho(page: Page): Promise<void> {
  await adicionarProdutoAoCarrinho(page, 1);
  await continuarComprando(page);
}

export async function adicionarDoisProdutosAoCarrinho(page: Page): Promise<void> {
  await adicionarProdutoAoCarrinho(page, 1);
  await continuarComprando(page);
  await adicionarProdutoAoCarrinho(page, 2);
}

export function linhaProduto(page: Page, produtoId: number) {
  return new CartPage(page).linhaProduto(produtoId);
}
