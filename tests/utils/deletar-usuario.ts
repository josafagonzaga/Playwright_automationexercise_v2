import type { Page } from '@playwright/test';
import { AccountPage } from '../pages/account-page';

export async function deletarUsuario(page: Page): Promise<void> {
  await new AccountPage(page).deletarConta();
}
