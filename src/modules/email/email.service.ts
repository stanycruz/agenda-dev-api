import { Injectable, Logger } from '@nestjs/common';
// Exemplo usando nodemailer para envio de e-mails
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: +(process.env.EMAIL_PORT || 587),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendBirthdayEmail(
    to: string,
    subject: string,
    html: string,
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
      });
      this.logger.log(`E-mail de aniversário enviado para ${to}`);
    } catch (error) {
      this.logger.error('Erro ao enviar e-mail', error);
    }
  }

  // Método para enviar e-mails para todos os aniversariantes do dia
  async sendBirthdayEmails(
    persons: { email: string; name: string }[],
  ): Promise<void> {
    for (const person of persons) {
      const subject = 'Parabéns!';
      const html = `<p>Olá ${person.name}, desejamos um feliz aniversário!</p>`;
      await this.sendBirthdayEmail(person.email, subject, html);
    }
  }
}
