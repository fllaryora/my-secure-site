import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//npm install --save @nestjs/swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Cats sample')
  .setDescription('The cats api description')
  .setVersion('1.0')
  //.addTag('cats')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(
    app, config
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
