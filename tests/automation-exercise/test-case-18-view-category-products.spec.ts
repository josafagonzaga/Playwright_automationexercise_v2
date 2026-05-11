import { test } from '../fixtures/pages';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Categorias de Produtos', () => {
  test('deve visualizar produtos por categoria', async ({ homePage, productsPage, page }) => {
    await bloquearAnuncios(page);

    await homePage.acessarEValidar();
    await productsPage.validarCategoriasVisiveis();

    await productsPage.abrirCategoria('Women', 'Tops');
    await productsPage.validarCategoriaAberta(2, 'Women - Tops Products');

    await productsPage.acessarCategoriaPorId(3);
    await productsPage.validarCategoriaAberta(3, 'Men - Tshirts Products');
  });
});
