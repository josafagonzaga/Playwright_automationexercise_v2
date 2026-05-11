import { test } from '../fixtures/pages';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { cadastrarUsuario } from '../utils/cadastrar-usuario';
import { deletarUsuario } from '../utils/deletar-usuario';

test.describe('Automation Exercise - Cadastro com Email Existente', () => {
  test('deve exibir erro ao tentar cadastrar email ja existente', async ({
    homePage,
    loginSignupPage,
    page,
  }) => {
    const usuario = gerarUsuarioTeste();

    // Preparação: criar um usuário para que o email já exista no sistema
    await cadastrarUsuario(page, usuario, { fazerLogout: true });

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await homePage.acessarEValidar();

    // 4. Clicar no botão "Signup / Login"
    await homePage.abrirLoginCadastro();

    // 5. Validar que "New User Signup!" está visível
    await loginSignupPage.validarFormularioCadastroVisivel();

    // 6. Informar nome e endereço de email já registrado
    // 7. Clicar no botão "Signup"
    await loginSignupPage.iniciarCadastro(usuario);

    // 8. Validar que a mensagem de erro está visível
    await loginSignupPage.validarEmailJaExistente();

    // Limpeza: fazer login e deletar o usuário criado na preparação
    await loginSignupPage.fazerLogin(usuario.email, usuario.senha);
    await deletarUsuario(page);
  });
});
