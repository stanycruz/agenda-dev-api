import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Agenda Dev API')
    .setDescription('API RESTful para gerenciamento de pessoas e empresas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.getHttpAdapter().get('/', (req, res: Response) => {
    res.redirect('/api/docs');
  });

  await app.listen(3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
