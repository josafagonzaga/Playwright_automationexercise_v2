import { test } from '../fixtures/pages';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Marcas de Produtos', () => {
  test('deve visualizar produtos por marca', async ({ homePage, productsPage, page }) => {
    await bloquearAnuncios(page);

    await homePage.acessarEValidar();
    await productsPage.abrirPeloMenu();
    await productsPage.validarPaginaProdutosAberta();
    await productsPage.validarMarcasVisiveis();

    await productsPage.abrirMarca(/Polo/);
    await productsPage.validarMarcaAberta('Polo', 'Brand - Polo Products');

    await productsPage.abrirMarca(/H&M/);
    await productsPage.validarMarcaAberta('H&M', 'Brand - H&M Products');
  });
});
