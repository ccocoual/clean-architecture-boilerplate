import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { capitalCase } from 'change-case';
@Injectable()
export class SwaggerService {
  activate(app: INestApplication): void {
    const projectName: string = capitalCase(app.get(EnvironmentConfigService).get('npm_package_name'));
    const options: Omit<OpenAPIObject, 'components' | 'paths'> = new DocumentBuilder()
      .setTitle(`${projectName} API`)
      .setDescription(`The ${projectName} project API`)
      .setVersion(app.get(EnvironmentConfigService).get('npm_package_version'))
      .addTag('dummy')
      .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/doc', app, document);
  }
}
