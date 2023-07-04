import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule,  } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOption = new DocumentBuilder()
    .setTitle('Job Portal API')
    .setDescription('Job Portal API description ')
    .setVersion('1.0')
    .addTag('Job Portal')
    .build();

    const document = SwaggerModule.createDocument(app,swaggerOption);
    SwaggerModule.setup('api',app,document);

  await app.listen(3000);
}
bootstrap();
