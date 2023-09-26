import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule,  } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOption = new DocumentBuilder()
    .setTitle('Job Portal API')
    .setDescription('Job Portal API description ')
    .setVersion('1.0')
    .addTag('Job Portal')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app,swaggerOption);
    SwaggerModule.setup('api',app,document);

    app.useGlobalPipes(new ValidationPipe({
      whitelist:true
    }))
    
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}

bootstrap();