import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Exemplo de endpoint para login via Appwrite SSO (incluindo Google)
  @Post('login')
  async login(@Body() body: any) {
    // body deve conter os dados necessários para o login (por exemplo, token do Appwrite)
    return await this.authService.login(body);
  }

  // Endpoint para refresh de token
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return await this.authService.refreshToken(refreshToken);
  }
}
