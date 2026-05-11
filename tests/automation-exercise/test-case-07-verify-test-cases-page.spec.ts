import { test } from '../fixtures/pages';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Pagina de Casos de Teste', () => {
  test('deve navegar para a pagina de casos de teste com sucesso', async ({
    homePage,
    testCasesPage,
    page,
  }) => {
    await bloquearAnuncios(page);

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await homePage.acessarEValidar();

    // 4. Clicar no botão "Test Cases"
    await testCasesPage.abrirPeloMenu();

    // 5. Validar que o usuário foi navegado para a página de casos de teste
    await testCasesPage.validarAberta();
  });
});
