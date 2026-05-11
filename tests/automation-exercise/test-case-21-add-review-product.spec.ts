import { test } from '../fixtures/pages';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Review de Produto', () => {
  test('deve adicionar review em produto', async ({
    homePage,
    productDetailPage,
    productsPage,
    page,
  }) => {
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    await homePage.acessarEValidar();
    await productsPage.abrirPeloMenu();
    await productsPage.validarPaginaProdutosAberta();
    await productsPage.abrirDetalheProduto(1);

    await productDetailPage.validarFormularioReviewVisivel();
    await productDetailPage.enviarReview(usuario, 'Produto avaliado por teste automatizado.');

    await productDetailPage.validarReviewEnviada();
  });
});
