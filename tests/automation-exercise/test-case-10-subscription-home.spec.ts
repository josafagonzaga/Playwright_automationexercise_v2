import { test } from '../fixtures/pages';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Inscricao na Home', () => {
  test('deve validar subscription na pagina inicial', async ({
    homePage,
    subscriptionComponent,
    page,
  }) => {
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await homePage.acessarEValidar();

    // 4. Rolar até o rodapé
    // 5. Validar o texto "SUBSCRIPTION"
    await subscriptionComponent.validarVisivel();

    // 6. Informar email e clicar no botão de seta
    await subscriptionComponent.cadastrarEmail(usuario.email);

    // 7. Validar a mensagem de sucesso
    await subscriptionComponent.validarCadastroRealizado();
  });
});
