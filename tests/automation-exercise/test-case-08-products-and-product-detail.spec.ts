import { test } from '../fixtures/pages';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Produtos', () => {
  test('deve validar a lista de produtos e a pagina de detalhe do produto', async ({
    homePage,
    productDetailPage,
    productsPage,
    page,
  }) => {
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

    // 6. Validar que a lista de produtos está visível
    await productsPage.validarListaProdutosVisivel();

    // 7. Clicar em "View Product" do primeiro produto
    await productsPage.abrirDetalheProduto(1);

    // 8. Validar que o usuário chegou na página de detalhe do produto
    await productDetailPage.validarPaginaDetalheAberta(1);

    // 9. Validar detalhes do produto: nome, categoria, preço, disponibilidade, condição e marca
    await productDetailPage.validarDetalhesProduto({
      nome: 'Blue Top',
      preco: /Rs\. 500/,
    });
  });
});
