import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ProxyServicesDynamicModule } from '../use_cases_proxy/proxy-services-dynamic.module';
import { DummyController } from './dummy.controller';
import { InvalidDummyErrorFilter } from './filters/invalid-dummy-error.filter';
import { SwaggerModule } from '../config/swagger/swagger.module';
import { ItemNotFoundErrorFilter } from './filters/item-not-found-error.filter';

@Module({
  imports: [ProxyServicesDynamicModule.register(), SwaggerModule],
  controllers: [DummyController],
  providers: [
    { provide: APP_FILTER, useClass: ItemNotFoundErrorFilter },
    { provide: APP_FILTER, useClass: InvalidDummyErrorFilter },
  ],
})
export class RestModule {}
