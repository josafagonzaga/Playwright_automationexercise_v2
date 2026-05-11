import { test } from '../fixtures/pages';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Remover Produtos do Carrinho', () => {
  test('deve remover produto do carrinho', async ({ cartPage, homePage, productsPage, page }) => {
    await bloquearAnuncios(page);

    await homePage.acessarEValidar();
    await productsPage.abrirPeloMenu();
    await productsPage.validarPaginaProdutosAberta();
    await productsPage.adicionarProdutoAoCarrinho(1);
    await cartPage.validarModalCarrinhoVisivel();
    await cartPage.continuarComprando();
    await cartPage.abrirPeloMenu();

    await cartPage.validarProduto({
      id: 1,
      nome: 'Blue Top',
      quantidade: '1',
    });
    await cartPage.removerProduto(1);

    await cartPage.validarProdutoRemovido(1);
    await cartPage.validarCarrinhoVazio();
  });
});
