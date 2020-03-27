import {INestApplication, Logger} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './infrastructure/app.module';
import { EnvironmentConfigService } from './infrastructure/config/environment-config/environment-config.service';
import {SwaggerService} from './infrastructure/config/swagger/swagger.service';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  app.setGlobalPrefix('api');

  app.get(SwaggerService).activate(app);


  const port: string = app.get(EnvironmentConfigService).get('PORT');
  await app.listen(port);

  Logger.log(`Server listen on PORT: ${port}`);
}
bootstrap();
