import { test } from '../fixtures/pages';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Produtos Recomendados', () => {
  test('deve adicionar item recomendado ao carrinho', async ({ cartPage, homePage, page }) => {
    await bloquearAnuncios(page);

    await homePage.acessarEValidar();
    await homePage.validarItensRecomendadosVisiveis();

    const nomeProduto = await homePage.adicionarPrimeiroItemRecomendadoAoCarrinho();

    await cartPage.validarModalCarrinhoVisivel();
    await cartPage.abrirPeloModal();

    await cartPage.validarConteudo(nomeProduto);
  });
});
