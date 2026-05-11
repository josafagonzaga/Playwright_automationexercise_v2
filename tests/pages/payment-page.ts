import { expect, type Download, type Page } from '@playwright/test';

type CartaoPagamento = {
  nome: string;
  numero: string;
  cvc: string;
  mesExpiracao: string;
  anoExpiracao: string;
};

export class PaymentPage {
  constructor(private readonly page: Page) {}

  async preencherCartao(cartao: CartaoPagamento): Promise<void> {
    await this.page.getByTestId('name-on-card').fill(cartao.nome);
    await this.page.getByTestId('card-number').fill(cartao.numero);
    await this.page.getByTestId('cvc').fill(cartao.cvc);
    await this.page.getByTestId('expiry-month').fill(cartao.mesExpiracao);
    await this.page.getByTestId('expiry-year').fill(cartao.anoExpiracao);
  }

  async pagar(): Promise<void> {
    await this.page.getByTestId('pay-button').click();
  }

  async validarPedidoConfirmado(): Promise<void> {
    await expect(
      this.page.getByText('Congratulations! Your order has been confirmed!')
    ).toBeVisible();
  }

  async validarPedidoRealizado(): Promise<void> {
    await expect(this.page.getByText('Order Placed!')).toBeVisible();
  }

  async baixarInvoice(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent('download');

    await this.page.getByRole('link', { name: 'Download Invoice' }).click();

    return downloadPromise;
  }

  async validarNomeArquivoInvoice(download: Download): Promise<void> {
    expect(download.suggestedFilename()).toContain('invoice');
  }
}
