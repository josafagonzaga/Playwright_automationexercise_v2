import { test } from '../fixtures/pages';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { deletarUsuario } from '../utils/deletar-usuario';
import { cadastrarUsuario } from '../utils/cadastrar-usuario';

test.describe('Automation Exercise - Logout de Usuário', () => {
  test('deve fazer logout de um usuário logado', async ({
    accountPage,
    homePage,
    loginSignupPage,
    page,
  }) => {
    const usuario = gerarUsuarioTeste();

    // Preparação: criar um usuário para usar credenciais válidas no login
    await cadastrarUsuario(page, usuario, { fazerLogout: true });

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await homePage.acessarEValidar();

    // 4. Clicar no botão "Signup / Login"
    await homePage.abrirLoginCadastro();

    // 5. Validar que "Login to your account" está visível
    await loginSignupPage.validarFormularioLoginVisivel();

    // 6. Informar email e senha corretos
    // 7. Clicar no botão "Login"
    await loginSignupPage.fazerLogin(usuario.email, usuario.senha);

    // 8. Validar que "Logged in as username" está visível
    await accountPage.validarUsuarioLogado(usuario.nome);

    // 9. Clicar no botão "Logout"
    await accountPage.sair();

    // 10. Validar que o usuário foi redirecionado para a página de login
    await loginSignupPage.validarPaginaLoginAberta();

    // Limpeza: fazer login novamente e deletar o usuário criado
    await loginSignupPage.fazerLogin(usuario.email, usuario.senha);
    await deletarUsuario(page);
  });
});
