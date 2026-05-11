import { expect, type Page } from '@playwright/test';

export class AccountPage {
  constructor(private readonly page: Page) {}

  async validarContaCriada(): Promise<void> {
    await expect(this.page.getByTestId('account-created')).toBeVisible();
  }

  async continuar(): Promise<void> {
    await this.page.getByTestId('continue-button').click();
  }

  async validarUsuarioLogado(nome: string): Promise<void> {
    await expect(this.page.getByText(`Logged in as ${nome}`)).toBeVisible();
  }

  async sair(): Promise<void> {
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }

  async deletarConta(): Promise<void> {
    await this.page.getByRole('link', { name: 'Delete Account' }).click();
    await expect(this.page.getByTestId('account-deleted')).toBeVisible();
    await this.continuar();
  }
}
