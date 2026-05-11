import { expect, type Page } from '@playwright/test';
import type { UsuarioTeste } from '../utils/gerar-usuario-teste';

export class LoginSignupPage {
  constructor(private readonly page: Page) {}

  async validarFormularioCadastroVisivel(): Promise<void> {
    await expect(this.page.getByText('New User Signup!')).toBeVisible();
  }

  async validarFormularioLoginVisivel(): Promise<void> {
    await expect(this.page.getByText('Login to your account')).toBeVisible();
  }

  async validarPaginaLoginAberta(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login$/);
    await this.validarFormularioLoginVisivel();
  }

  async iniciarCadastro(usuario: Pick<UsuarioTeste, 'nome' | 'email'>): Promise<void> {
    await this.page.getByPlaceholder('Name').fill(usuario.nome);
    await this.formularioCadastro.getByPlaceholder('Email Address').fill(usuario.email);
    await this.formularioCadastro.getByRole('button', { name: 'Signup' }).click();
  }

  async validarInformacoesContaVisiveis(): Promise<void> {
    await expect(this.page.getByText('Enter Account Information')).toBeVisible();
    await expect(
      this.page.getByRole('heading', { name: 'Enter Account Information' })
    ).toBeVisible();
  }

  async preencherDetalhesConta(usuario: UsuarioTeste): Promise<void> {
    await this.page.getByRole('radio', { name: 'Mr.' }).check();
    await this.page.getByLabel('Password').fill(usuario.senha);
    await this.page.getByTestId('days').selectOption('28');
    await this.page.getByTestId('months').selectOption('5');
    await this.page.getByTestId('years').selectOption('1979');
    await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await this.page
      .getByRole('checkbox', { name: 'Receive special offers from our partners!' })
      .check();
    await this.page.getByTestId('first_name').fill(usuario.primeiroNome);
    await this.page.getByTestId('last_name').fill(usuario.sobrenome);
    await this.page.getByTestId('company').fill(usuario.empresa);
    await this.page.getByTestId('address').fill(usuario.endereco);
    await this.page.getByTestId('address2').fill(usuario.complemento);
    await this.page.getByTestId('country').selectOption(usuario.pais);
    await this.page.getByTestId('state').fill(usuario.estado);
    await this.page.getByTestId('city').fill(usuario.cidade);
    await this.page.getByTestId('zipcode').fill(usuario.cep);
    await this.page.getByTestId('mobile_number').fill(usuario.telefone);
  }

  async criarConta(): Promise<void> {
    await this.page.getByTestId('create-account').click();
  }

  async validarEmailJaExistente(): Promise<void> {
    await expect(this.page.getByText('Email Address already exist!')).toBeVisible();
  }

  async validarCredenciaisInvalidas(): Promise<void> {
    await expect(this.page.getByText('Your email or password is incorrect!')).toBeVisible();
  }

  async fazerLogin(email: string, senha: string): Promise<void> {
    await this.formularioLogin.getByPlaceholder('Email Address').fill(email);
    await this.page.getByPlaceholder('Password').fill(senha);
    await this.formularioLogin.getByRole('button', { name: 'Login' }).click();
  }

  private get formularioCadastro() {
    return this.page.locator('form').filter({ hasText: 'Signup' });
  }

  private get formularioLogin() {
    return this.page.locator('form').filter({ hasText: 'Login' });
  }
}
