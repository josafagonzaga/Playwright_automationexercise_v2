import { test } from '../fixtures/pages';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { cadastrarUsuarioPelaTelaLogin } from '../utils/cadastrar-usuario';
import { deletarUsuario } from '../utils/deletar-usuario';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Enderecos no Checkout', () => {
  test('deve validar endereco de entrega e cobranca no checkout', async ({
    accountPage,
    cartPage,
    checkoutPage,
    homePage,
    productsPage,
    page,
  }) => {
    test.setTimeout(60000);
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    await homePage.acessarEValidar();
    await homePage.abrirLoginCadastro();
    await cadastrarUsuarioPelaTelaLogin(page, usuario);
    await accountPage.validarUsuarioLogado(usuario.nome);

    await productsPage.abrirPeloMenu();
    await productsPage.validarPaginaProdutosAberta();
    await productsPage.adicionarProdutoAoCarrinho(1);
    await cartPage.validarModalCarrinhoVisivel();
    await cartPage.continuarComprando();
    await cartPage.abrirPeloMenu();
    await checkoutPage.irParaCheckout();
    await checkoutPage.validarEnderecos(usuario);

    await deletarUsuario(page);
  });
});
