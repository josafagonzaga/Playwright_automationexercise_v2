import { test } from '../fixtures/pages';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Produtos no Carrinho', () => {
  test('deve adicionar dois produtos ao carrinho e validar valores', async ({
    cartPage,
    homePage,
    productsPage,
    page,
  }) => {
    await bloquearAnuncios(page);

    await homePage.acessarEValidar();
    await productsPage.abrirPeloMenu();
    await productsPage.validarPaginaProdutosAberta();
    await productsPage.adicionarProdutoAoCarrinho(1);
    await cartPage.validarModalCarrinhoVisivel();
    await cartPage.continuarComprando();
    await productsPage.adicionarProdutoAoCarrinho(2);
    await cartPage.validarModalCarrinhoVisivel();
    await cartPage.abrirPeloModal();

    await cartPage.validarProduto({
      id: 1,
      nome: 'Blue Top',
      preco: 'Rs. 500',
      quantidade: '1',
      total: 'Rs. 500',
    });

    await cartPage.validarProduto({
      id: 2,
      nome: 'Men Tshirt',
      preco: 'Rs. 400',
      quantidade: '1',
      total: 'Rs. 400',
    });
  });
});
