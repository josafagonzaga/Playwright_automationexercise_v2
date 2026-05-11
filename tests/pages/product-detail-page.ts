import { expect, type Page } from '@playwright/test';
import type { UsuarioTeste } from '../utils/gerar-usuario-teste';

type DetalhesProdutoEsperados = {
  nome: string;
  preco: string | RegExp;
};

export class ProductDetailPage {
  constructor(private readonly page: Page) {}

  async validarPaginaDetalheAberta(idProduto: number): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`/product_details/${idProduto}$`));
  }

  async validarDetalhesProduto(detalhes: DetalhesProdutoEsperados): Promise<void> {
    await expect(
      this.informacoesProduto.getByRole('heading', { name: detalhes.nome })
    ).toBeVisible();
    await expect(this.informacoesProduto.getByText(/Category:/)).toBeVisible();
    await expect(this.informacoesProduto.getByText(detalhes.preco)).toBeVisible();
    await expect(this.informacoesProduto.getByText(/Availability:/)).toBeVisible();
    await expect(this.informacoesProduto.getByText(/Condition:/)).toBeVisible();
    await expect(this.informacoesProduto.getByText(/Brand:/)).toBeVisible();
  }

  async preencherQuantidade(quantidade: string): Promise<void> {
    await this.page.locator('#quantity').fill(quantidade);
  }

  async adicionarAoCarrinho(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add to cart' }).click({ force: true });
  }

  async validarFormularioReviewVisivel(): Promise<void> {
    await expect(this.page.getByText('Write Your Review')).toBeVisible();
  }

  async enviarReview(
    usuario: Pick<UsuarioTeste, 'nome' | 'email'>,
    mensagem: string
  ): Promise<void> {
    await this.page.locator('#name').fill(usuario.nome);
    await this.page.locator('#email').fill(usuario.email);
    await this.page.locator('#review').fill(mensagem);
    await this.page.locator('#button-review').click();
  }

  async validarReviewEnviada(): Promise<void> {
    await expect(this.page.getByText('Thank you for your review.')).toBeVisible();
  }

  private get informacoesProduto() {
    return this.page.locator('.product-information');
  }
}
