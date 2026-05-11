import { test } from '../fixtures/pages';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Formulario de Contato', () => {
  test('deve enviar o formulario de contato com sucesso', async ({
    contactPage,
    homePage,
    page,
  }) => {
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await homePage.acessarEValidar();

    // 4. Clicar no botão "Contact Us"
    await contactPage.abrirPeloMenu();

    // 5. Validar que "GET IN TOUCH" está visível
    await contactPage.validarAberta();

    // 6. Informar nome, email, assunto e mensagem
    await contactPage.preencherFormulario(usuario, {
      assunto: 'Contato de teste',
      mensagem: 'Mensagem enviada por teste automatizado.',
    });

    // 7. Fazer upload de arquivo
    await contactPage.anexarArquivo('README.md');

    // 8. Clicar no botão "Submit"
    // 9. Clicar no botão OK
    await contactPage.enviar();

    // 10. Validar que a mensagem de sucesso está visível
    await contactPage.validarMensagemSucesso();

    // 11. Clicar no botão "Home" e validar que voltou para a página inicial
    await contactPage.voltarParaHome();
    await homePage.validarCarregada();
  });
});
