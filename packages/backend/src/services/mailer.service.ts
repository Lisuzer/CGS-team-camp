import nodemailer from 'nodemailer';
import { IMailerWrite } from '../types/mailer.type';

export default class MailerService {
  transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
      }
    });
  }

  async confirmEmail(to: string, link: string) {
    const message = {
      to,
      subject: 'Confirm email',
      html: `
          <h1>Click on this link to confirm your email</h1>
          <a href="${link}">Confirm my email</a>
        `
    };
    await this.sendmail(message);
  }

  async resetPassword(to: string, link: string) {
    const message = {
      to,
      subject: 'Reset password',
      html: `
          <h1>Click on this link to reset your password</h1>
          <a href="${link}">Reset my password</a>
        `
    };
    await this.sendmail(message);
  }

  async sendmail(write: IMailerWrite) {
    await this.transporter.sendMail({ from: process.env.MAILER_USER, ...write });
  }
}
