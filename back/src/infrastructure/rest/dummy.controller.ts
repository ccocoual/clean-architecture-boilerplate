import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Dummy } from '../../domain/dummy';
import { CreateDummyData } from '../../use_cases/create-dummy-data';
import { GetAllDummyData } from '../../use_cases/get-all-dummy-data';
import { ProxyServicesDynamicModule } from '../use_cases_proxy/proxy-services-dynamic.module';
import { UseCaseProxy } from '../use_cases_proxy/use-case-proxy';
import { DummyResponseInterface } from './models/dummy-response.interface';
import { PostDummyRequestInterface } from './models/post-dummy-request.interface';
import { DummyNotFoundResponseSwagger } from './swagger/dummy-not-found-response.swagger';
import { DummyResponseSwagger } from './swagger/dummy-response.swagger';
import { PostDummyRequestSwagger } from './swagger/post-dummy-request.swagger';

@Controller('/dummy')
export class DummyController {
  constructor(
    @Inject(ProxyServicesDynamicModule.GET_ALL_DUMMY_DATA_PROXY_SERVICE) private readonly getAllDummyDataProxyService: UseCaseProxy<GetAllDummyData>,
    @Inject(ProxyServicesDynamicModule.CREATE_DUMMY_DATA_PROXY_SERVICE) private readonly createDummyDataProxyService: UseCaseProxy<CreateDummyData>
  ) {}

  @Get('/')
  @ApiResponse({ status: 200, type: DummyResponseSwagger })
  @ApiResponse({ status: 404, type: DummyNotFoundResponseSwagger })
  async getAllDummyData(): Promise<DummyResponseInterface[]> {
    return this.getAllDummyDataProxyService.getInstance().execute();
  }

  @Post('/')
  @ApiBody({ type: PostDummyRequestSwagger })
  async postDummyData(@Body() postDummyDataRequest: PostDummyRequestInterface): Promise<Dummy> {
    return this.createDummyDataProxyService.getInstance().execute(postDummyDataRequest.value);
  }
}
