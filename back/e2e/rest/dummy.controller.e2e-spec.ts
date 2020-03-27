import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request, { Response } from 'supertest';
import { ItemNotFoundError } from '../../src/domain/common-errors/item-not-found.error';
import { Dummy } from '../../src/domain/dummy';
import { InvalidDummyError } from '../../src/domain/invalid-dummy.error';
import { EnvironmentConfigService } from '../../src/infrastructure/config/environment-config/environment-config.service';
import { DummyResponseInterface } from '../../src/infrastructure/rest/models/dummy-response.interface';
import { RestModule } from '../../src/infrastructure/rest/rest.module';
import { ProxyServicesDynamicModule } from '../../src/infrastructure/use_cases_proxy/proxy-services-dynamic.module';
import { UseCaseProxy } from '../../src/infrastructure/use_cases_proxy/use-case-proxy';
import { CreateDummyData } from '../../src/use_cases/create-dummy-data';
import { GetAllDummyData } from '../../src/use_cases/get-all-dummy-data';
import { e2eEnvironmentConfigService } from '../e2e-config';

describe('infrastructure/rest/DummyController (e2e)', () => {
  let app: INestApplication;
  let mockGetAllDummyData: GetAllDummyData;
  let mockCreateDummyData: CreateDummyData;

  beforeAll(async () => {
    mockGetAllDummyData = {} as GetAllDummyData;
    mockGetAllDummyData.execute = jest.fn();
    const mockGetAllDummyDataProxyService: UseCaseProxy<GetAllDummyData> = {
      getInstance: () => mockGetAllDummyData,
    } as UseCaseProxy<GetAllDummyData>;

    mockCreateDummyData = {} as CreateDummyData;
    mockCreateDummyData.execute = jest.fn();
    const mockCreateDummyDataProxyService: UseCaseProxy<CreateDummyData> = {
      getInstance: () => mockCreateDummyData,
    } as UseCaseProxy<CreateDummyData>;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RestModule],
    })
      .overrideProvider(ProxyServicesDynamicModule.GET_ALL_DUMMY_DATA_PROXY_SERVICE)
      .useValue(mockGetAllDummyDataProxyService)
      .overrideProvider(ProxyServicesDynamicModule.CREATE_DUMMY_DATA_PROXY_SERVICE)
      .useValue(mockCreateDummyDataProxyService)
      .overrideProvider(EnvironmentConfigService)
      .useValue(e2eEnvironmentConfigService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /dummy', () => {
    it('should return http status code OK with found dummies', () => {
      // given
      const foundDummies: DummyResponseInterface[] = [{ id: 1, value: 'value1' } as Dummy, { id: 2, value: 'value2' } as DummyResponseInterface];
      (mockGetAllDummyData.execute as jest.Mock).mockReturnValue(Promise.resolve(foundDummies));

      // when
      const testRequest: request.Test = request(app.getHttpServer()).get('/dummy');

      // then
      return testRequest.expect(200).expect(foundDummies);
    });

    it('should return http not found when dummy not found', () => {
      // given
      (mockGetAllDummyData.execute as jest.Mock).mockImplementation(() => {
        throw new ItemNotFoundError('Document not found');
      });

      // when
      const testRequest: request.Test = request(app.getHttpServer()).get('/dummy');

      // then
      return testRequest.expect(404);
    });
  });

  describe('POST /dummy', () => {
    it('should create body using value from body', () => {
      // given
      const value: string = 'a-value';

      // when
      const testRequest: request.Test = request(app.getHttpServer())
        .post('/dummy')
        .send({ value });

      // then
      return testRequest.expect(201).expect((response: Response) => {
        expect(mockCreateDummyData.execute).toHaveBeenCalledWith(value);
      });
    });

    it('should return http status code CREATED with created dummy', () => {
      // given
      const createdDummy: Dummy = { id: 1, value: 'a-value' } as Dummy;
      (mockCreateDummyData.execute as jest.Mock).mockReturnValue(Promise.resolve(createdDummy));

      // when
      const testRequest: request.Test = request(app.getHttpServer())
        .post('/dummy')
        .send({ value: 'a-value' });

      // then
      return testRequest.expect(201).expect(createdDummy);
    });

    it('should return http status code BAD REQUEST when invalid dummy', () => {
      // given
      (mockCreateDummyData.execute as jest.Mock).mockImplementation(() => {
        throw new InvalidDummyError('value cannot be null or empty');
      });
      const fixedDate: Date = new Date('2017-06-13T04:41:20');
      // @ts-ignore
      jest.spyOn(global, 'Date').mockImplementationOnce(() => fixedDate);

      // when
      const testRequest: request.Test = request(app.getHttpServer())
        .post('/dummy')
        .send({ value: '' });

      // then
      return testRequest.expect(400).expect({
        statusCode: 400,
        timestamp: '2017-06-13T08:41:20.000Z',
        name: 'Error',
        message: 'value cannot be null or empty',
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
