import { test } from '../fixtures/pages';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Inscricao no Carrinho', () => {
  test('deve validar subscription na pagina de carrinho', async ({
    cartPage,
    homePage,
    subscriptionComponent,
    page,
  }) => {
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    await homePage.acessarEValidar();
    await cartPage.abrirPeloMenu();

    await subscriptionComponent.validarVisivel();

    await subscriptionComponent.cadastrarEmail(usuario.email);

    await subscriptionComponent.validarCadastroRealizado();
  });
});
