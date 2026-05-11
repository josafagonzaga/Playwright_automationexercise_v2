import { expect, type Page } from '@playwright/test';

export class TestCasesPage {
  constructor(private readonly page: Page) {}

  async abrirPeloMenu(): Promise<void> {
    await this.page.locator('header').getByRole('link', { name: 'Test Cases' }).click();
  }

  async validarAberta(): Promise<void> {
    await expect(this.page).toHaveURL(/\/test_cases$/);
    await expect(this.page.locator('h2.title').getByText('Test Cases')).toBeVisible();
    await expect(this.page.getByText('Below is the list of test Cases')).toBeVisible();
  }
}
