import { test } from '../fixtures/pages';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Scroll sem Botao de Seta', () => {
  test('deve rolar para baixo e voltar ao topo sem usar a seta', async ({
    homePage,
    subscriptionComponent,
    page,
  }) => {
    await bloquearAnuncios(page);

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await homePage.acessarEValidar();

    // 4. Rolar a página até o final
    // 5. Validar que "SUBSCRIPTION" está visível
    await subscriptionComponent.validarVisivel();

    // 6. Rolar a página para o topo sem usar o botão de seta
    await homePage.voltarAoTopoPorScroll();

    // 7. Validar que a página voltou ao topo e o texto principal está visível
    await homePage.validarTextoPrincipalNoViewport();
  });
});
