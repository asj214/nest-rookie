import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export function initSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Nest Rookie')
    .setDescription('Nest Rookie Swagger API')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      name: 'JWT',
      in: 'header',
    },
    'access-token'
    )
    .build();

  const extraOption: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    }
  }

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, extraOption);
}