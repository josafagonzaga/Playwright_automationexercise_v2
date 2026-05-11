import type { Page } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout-page';
import { PaymentPage } from '../pages/payment-page';
import type { UsuarioTeste } from './gerar-usuario-teste';

export async function irParaCheckout(page: Page): Promise<void> {
  await new CheckoutPage(page).irParaCheckout();
}

export async function irParaLoginPeloCheckout(page: Page): Promise<void> {
  await new CheckoutPage(page).irParaLoginPeloCheckout();
}

export async function validarEnderecosCheckout(page: Page, usuario: UsuarioTeste): Promise<void> {
  await new CheckoutPage(page).validarEnderecos(usuario);
}

export async function finalizarPedido(page: Page): Promise<void> {
  const checkoutPage = new CheckoutPage(page);
  const paymentPage = new PaymentPage(page);

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
}
