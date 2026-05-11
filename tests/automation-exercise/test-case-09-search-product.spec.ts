import { test } from '../fixtures/pages';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Busca de Produto', () => {
  test('deve buscar produto e exibir resultados relacionados', async ({
    homePage,
    productsPage,
    page,
  }) => {
    const nomeProduto = 'top';
    await bloquearAnuncios(page);

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await homePage.acessarEValidar();

    // 4. Clicar no botão "Products"
    await productsPage.abrirPeloMenu();

    // 5. Validar que o usuário foi navegado para a página ALL PRODUCTS
    await productsPage.validarPaginaProdutosAberta();

    // 6. Informar o nome do produto no campo de busca e clicar no botão de pesquisa
    await productsPage.buscarProduto(nomeProduto);

    // 7. Validar que "SEARCHED PRODUCTS" está visível
    await productsPage.validarProdutosBuscadosVisiveis();

    // 8. Validar que os produtos relacionados à busca estão visíveis
    await productsPage.validarResultadoContemTexto(/top/i);
  });
});
