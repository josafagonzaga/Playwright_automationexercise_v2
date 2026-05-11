import { test } from '../fixtures/pages';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Scroll com Botao de Seta', () => {
  test('deve rolar para baixo e voltar ao topo usando a seta', async ({
    homePage,
    subscriptionComponent,
    page,
  }) => {
    await bloquearAnuncios(page);

    await homePage.acessarEValidar();
    await subscriptionComponent.validarVisivel();

    await homePage.voltarAoTopoPelaSeta();

    await homePage.validarTextoPrincipalNoViewport();
  });
});
