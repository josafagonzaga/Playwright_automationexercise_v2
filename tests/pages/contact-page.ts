import { expect, type Page } from '@playwright/test';
import type { UsuarioTeste } from '../utils/gerar-usuario-teste';

type MensagemContato = {
  assunto: string;
  mensagem: string;
};

export class ContactPage {
  constructor(private readonly page: Page) {}

  async abrirPeloMenu(): Promise<void> {
    await this.page.getByRole('link', { name: 'Contact us' }).click();
  }

  async validarAberta(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
  }

  async preencherFormulario(
    usuario: Pick<UsuarioTeste, 'nome' | 'email'>,
    dados: MensagemContato
  ): Promise<void> {
    await this.page.getByTestId('name').fill(usuario.nome);
    await this.page.getByTestId('email').fill(usuario.email);
    await this.page.getByTestId('subject').fill(dados.assunto);
    await this.page.getByTestId('message').fill(dados.mensagem);
  }

  async anexarArquivo(caminhoArquivo: string): Promise<void> {
    await this.page.locator('input[name="upload_file"]').setInputFiles(caminhoArquivo);
  }

  async enviar(): Promise<void> {
    await this.page.waitForFunction(
      "window.jQuery && jQuery._data(document.querySelector('#contact-us-form'), 'events')?.submit?.length"
    );
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.page.getByTestId('submit-button').click();
  }

  async validarMensagemSucesso(): Promise<void> {
    const mensagemSucesso = this.page.locator('.status.alert-success');

    await expect(mensagemSucesso).toBeVisible();
    await expect(mensagemSucesso).toHaveText(
      'Success! Your details have been submitted successfully.'
    );
  }

  async voltarParaHome(): Promise<void> {
    await this.page.locator('#form-section').getByRole('link', { name: 'Home' }).click();
  }
}
