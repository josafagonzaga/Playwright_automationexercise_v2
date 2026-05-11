import type { Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { LoginSignupPage } from '../pages/login-signup-page';

export async function acessarPaginaInicial(page: Page): Promise<void> {
  await new HomePage(page).acessarEValidar();
}

export async function abrirTelaLoginCadastro(page: Page): Promise<void> {
  await new HomePage(page).abrirLoginCadastro();
}

export async function fazerLogin(page: Page, email: string, senha: string): Promise<void> {
  await new LoginSignupPage(page).fazerLogin(email, senha);
}
