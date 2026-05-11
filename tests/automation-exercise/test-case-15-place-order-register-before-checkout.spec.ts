import { test } from '../fixtures/pages';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { cadastrarUsuarioPelaTelaLogin } from '../utils/cadastrar-usuario';
import { deletarUsuario } from '../utils/deletar-usuario';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Pedido com Cadastro Antes do Checkout', () => {
  test('deve registrar usuario antes do checkout e finalizar pedido', async ({
    cartPage,
    checkoutPage,
    homePage,
    paymentPage,
    productsPage,
    page,
  }) => {
    test.setTimeout(60000);
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    await homePage.acessarEValidar();
    await homePage.abrirLoginCadastro();
    await cadastrarUsuarioPelaTelaLogin(page, usuario);

    await productsPage.abrirPeloMenu();
    await productsPage.validarPaginaProdutosAberta();
    await productsPage.adicionarProdutoAoCarrinho(1);
    await cartPage.validarModalCarrinhoVisivel();
    await cartPage.continuarComprando();
    await cartPage.abrirPeloMenu();
    await checkoutPage.irParaCheckout();
    await checkoutPage.validarEnderecos(usuario);
    await checkoutPage.informarComentario('Pedido criado por teste automatizado.');
    await checkoutPage.fazerPedido();
    await paymentPage.preencherCartao({
      nome: 'Usuario Teste',
      numero: '4111111111111111',
      cvc: '123',
      mesExpiracao: '12',
      anoExpiracao: '2030',
    });
    await paymentPage.pagar();

    await paymentPage.validarPedidoConfirmado();
    await paymentPage.validarPedidoRealizado();
    await deletarUsuario(page);
  });
});
