import type { Page } from '@playwright/test';
import { AccountPage } from '../pages/account-page';
import { HomePage } from '../pages/home-page';
import { LoginSignupPage } from '../pages/login-signup-page';
import type { UsuarioTeste } from './gerar-usuario-teste';

export async function preencherFormularioCadastro(
  page: Page,
  usuario: UsuarioTeste
): Promise<void> {
  await new LoginSignupPage(page).preencherDetalhesConta(usuario);
}

export async function cadastrarUsuario(
  page: Page,
  usuario: UsuarioTeste,
  opcoes?: { fazerLogout?: boolean }
): Promise<void> {
  const homePage = new HomePage(page);
  const accountPage = new AccountPage(page);

  await homePage.acessarEValidar();
  await homePage.abrirLoginCadastro();
  await cadastrarUsuarioPelaTelaLogin(page, usuario);

  if (opcoes?.fazerLogout) {
    await accountPage.sair();
  }
}

export async function cadastrarUsuarioPelaTelaLogin(
  page: Page,
  usuario: UsuarioTeste
): Promise<void> {
  const loginSignupPage = new LoginSignupPage(page);
  const accountPage = new AccountPage(page);

  await loginSignupPage.iniciarCadastro(usuario);
  await loginSignupPage.validarInformacoesContaVisiveis();

  await loginSignupPage.preencherDetalhesConta(usuario);
  await loginSignupPage.criarConta();
  await accountPage.validarContaCriada();
  await accountPage.continuar();
  await accountPage.validarUsuarioLogado(usuario.nome);
}
