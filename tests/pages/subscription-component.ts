import { expect, type Page } from '@playwright/test';

export class SubscriptionComponent {
  constructor(private readonly page: Page) {}

  async validarVisivel(): Promise<void> {
    await this.page.locator('footer').scrollIntoViewIfNeeded();
    await expect(this.page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
  }

  async cadastrarEmail(email: string): Promise<void> {
    await this.page.locator('#susbscribe_email').fill(email);
    await this.page.locator('#subscribe').click();
  }

  async validarCadastroRealizado(): Promise<void> {
    await expect(this.page.getByText('You have been successfully subscribed!')).toBeVisible();
  }
}
