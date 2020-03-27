import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { SwaggerService } from './swagger.service';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [SwaggerService],
  exports: [SwaggerService],
})
export class SwaggerModule {}
