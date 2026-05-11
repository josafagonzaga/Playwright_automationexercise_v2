import { test } from '../fixtures/pages';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { deletarUsuario } from '../utils/deletar-usuario';

test.describe('Automation Exercise - Cadastro de Usuário', () => {
  test('deve preencher nome e email no início do cadastro', async ({
    accountPage,
    homePage,
    loginSignupPage,
    page,
  }) => {
    const usuario = gerarUsuarioTeste();

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await homePage.acessarEValidar();

    // 4. Clicar em "Signup / Login"
    await homePage.abrirLoginCadastro();

    // 5. Validar que "New User Signup!" está visível
    await loginSignupPage.validarFormularioCadastroVisivel();

    // 6. Informar nome e endereço de email
    // 7. Clicar no botão "Signup"
    await loginSignupPage.iniciarCadastro(usuario);

    // 8. Validar que "Enter Account Information" está visível
    await loginSignupPage.validarInformacoesContaVisiveis();

    // 9. Preencher os detalhes da conta e dados de endereço
    await loginSignupPage.preencherDetalhesConta(usuario);

    // 10. Clicar no botão "Create Account"
    await loginSignupPage.criarConta();

    // 11. Validar que "Account Created!" está visível
    await accountPage.validarContaCriada();

    // 12. Clicar no botão "Continue"
    await accountPage.continuar();

    // 13. Validar que "Logged in as username" está visível
    await accountPage.validarUsuarioLogado(usuario.nome);

    // 14. Deletar usuário criado
    await deletarUsuario(page);
  });
});
