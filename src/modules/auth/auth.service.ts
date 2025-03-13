import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  // A URL e as chaves devem vir de variáveis de ambiente
  private readonly appwriteEndpoint =
    process.env.APPWRITE_ENDPOINT || 'https://seu-appwrite.com/v1';
  private readonly projectId =
    process.env.APPWRITE_PROJECT_ID || 'seu_project_id';
  private readonly apiKey = process.env.APPWRITE_API_KEY || 'sua_api_key';

  async login(data: any): Promise<any> {
    // Exemplo: integração com o endpoint de sessões do Appwrite
    try {
      // Você pode adaptar esse fluxo para trabalhar com login via Google (SSO) através do Appwrite
      const response = await axios.post(
        `${this.appwriteEndpoint}/account/sessions/oauth2/google`,
        data,
        {
          headers: {
            'x-appwrite-project': this.projectId,
            'x-appwrite-key': this.apiKey,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw new UnauthorizedException('Falha na autenticação');
    }
  }

  async refreshToken(refreshToken: string): Promise<any> {
    // Exemplo: chamada para o endpoint de refresh do Appwrite (caso exista) ou lógica customizada
    try {
      const response = await axios.post(
        `${this.appwriteEndpoint}/account/sessions/refresh`,
        { refreshToken },
        {
          headers: {
            'x-appwrite-project': this.projectId,
            'x-appwrite-key': this.apiKey,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw new UnauthorizedException('Falha ao atualizar token');
    }
  }
}
