import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token não informado');
    }

    const token = authHeader.replace('Bearer ', '');
    // Aqui você pode implementar a lógica de validação do token via Appwrite ou localmente
    try {
      // Exemplo: chamada para validação do token
      // await axios.get(`${process.env.APPWRITE_ENDPOINT}/account/sessions/verify`, { headers: { Authorization: token } });
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
