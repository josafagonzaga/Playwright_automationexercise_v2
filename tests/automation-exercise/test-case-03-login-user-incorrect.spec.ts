import { test } from '../fixtures/pages';

test.describe('Automation Exercise - Login de Usuário', () => {
  test('deve exibir erro ao tentar login com email e senha incorretos', async ({
    homePage,
    loginSignupPage,
  }) => {
    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await homePage.acessarEValidar();

    // 4. Clicar no botão "Signup / Login"
    await homePage.abrirLoginCadastro();

    // 5. Validar que "Login to your account" está visível
    await loginSignupPage.validarFormularioLoginVisivel();

    // 6. Informar email e senha incorretos
    // 7. Clicar no botão "Login"
    await loginSignupPage.fazerLogin('usuario.incorreto@email.com', 'senha_incorreta');

    // 8. Validar que a mensagem de erro está visível
    await loginSignupPage.validarCredenciaisInvalidas();
  });
});
