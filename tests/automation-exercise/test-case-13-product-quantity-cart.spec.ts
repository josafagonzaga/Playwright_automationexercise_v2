import { test } from '../fixtures/pages';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Quantidade no Carrinho', () => {
  test('deve validar quantidade do produto no carrinho', async ({
    cartPage,
    homePage,
    productDetailPage,
    productsPage,
    page,
  }) => {
    await bloquearAnuncios(page);

    await homePage.acessarEValidar();
    await productsPage.abrirDetalheProduto(1);

    await productDetailPage.validarPaginaDetalheAberta(1);
    await productDetailPage.validarDetalhesProduto({
      nome: 'Blue Top',
      preco: /Rs\. 500/,
    });

    await productDetailPage.preencherQuantidade('4');
    await productDetailPage.adicionarAoCarrinho();
    await cartPage.validarModalCarrinhoVisivel();
    await cartPage.abrirPeloModal();

    await cartPage.validarProduto({
      id: 1,
      nome: 'Blue Top',
      quantidade: '4',
    });
  });
});
