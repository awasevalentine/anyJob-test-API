import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  initSwagger(app);
  await app.listen(process.env.PORT || 3000, ()=>{
    console.log(`server running on localhost:3000`);
  });
}


function initSwagger(app: NestExpressApplication) {
  const options = new DocumentBuilder()
    .setTitle('Any job API')
    .setDescription('A simple RESTful web service for accessing Loan & Credit Facility')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}
bootstrap();
