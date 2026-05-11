import { expect, type Locator, type Page } from '@playwright/test';
import type { UsuarioTeste } from '../utils/gerar-usuario-teste';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async irParaCheckout(): Promise<void> {
    await this.page.getByText('Proceed To Checkout').click();
    await this.validarAberta();
  }

  async irParaLoginPeloCheckout(): Promise<void> {
    await this.page.getByText('Proceed To Checkout').click();
    await this.page.getByRole('link', { name: 'Register / Login' }).click();
    await expect(this.page.getByText('New User Signup!')).toBeVisible();
  }

  async validarAberta(): Promise<void> {
    await expect(this.page.getByText('Address Details')).toBeVisible();
    await expect(this.page.getByText('Review Your Order')).toBeVisible();
  }

  async validarEnderecos(usuario: UsuarioTeste): Promise<void> {
    await this.validarEndereco(this.enderecoEntrega, usuario);
    await this.validarEndereco(this.enderecoCobranca, usuario);
  }

  async informarComentario(comentario: string): Promise<void> {
    await this.page.locator('textarea[name="message"]').fill(comentario);
  }

  async fazerPedido(): Promise<void> {
    await this.page.getByRole('link', { name: 'Place Order' }).click();
  }

  private async validarEndereco(endereco: Locator, usuario: UsuarioTeste) {
    const nomeEndereco = `${usuario.primeiroNome} ${usuario.sobrenome}`;

    await expect(endereco).toContainText(nomeEndereco);
    await expect(endereco).toContainText(usuario.empresa);
    await expect(endereco).toContainText(usuario.endereco);
    await expect(endereco).toContainText(usuario.complemento);
    await expect(endereco).toContainText(usuario.cidade);
    await expect(endereco).toContainText(usuario.estado);
    await expect(endereco).toContainText(usuario.cep);
    await expect(endereco).toContainText(usuario.pais);
    await expect(endereco).toContainText(usuario.telefone);
  }

  private get enderecoEntrega() {
    return this.page.locator('#address_delivery');
  }

  private get enderecoCobranca() {
    return this.page.locator('#address_invoice');
  }
}
