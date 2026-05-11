import { test } from '../fixtures/pages';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { cadastrarUsuario } from '../utils/cadastrar-usuario';
import { deletarUsuario } from '../utils/deletar-usuario';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Busca e Carrinho Apos Login', () => {
  test('deve manter produto pesquisado no carrinho apos login', async ({
    cartPage,
    homePage,
    loginSignupPage,
    productsPage,
    page,
  }) => {
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    await cadastrarUsuario(page, usuario, { fazerLogout: true });

    await homePage.acessarEValidar();
    await productsPage.abrirPeloMenu();
    await productsPage.validarPaginaProdutosAberta();
    await productsPage.buscarProduto('top');
    await productsPage.validarProdutosBuscadosVisiveis();

    await productsPage.adicionarPrimeiroProdutoVisivelAoCarrinho();
    await cartPage.validarModalCarrinhoVisivel();
    await cartPage.abrirPeloModal();
    await cartPage.validarConteudo('Top');

    await homePage.abrirLoginCadastro();
    await loginSignupPage.fazerLogin(usuario.email, usuario.senha);
    await cartPage.abrirPeloMenu();
    await cartPage.validarConteudo('Top');

    await deletarUsuario(page);
  });
});
