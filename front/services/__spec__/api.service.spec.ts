import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { DummyResponseInterface } from '../../../back/src/infrastructure/rest/models/dummy-response.interface';
import ApiService from '~/services/api.service';

describe('services/ApiService', () => {
  let apiService: ApiService;
  let $get: jest.Mock;
  let useMock: jest.Mock;

  beforeEach(() => {
    $get = jest.fn();
    useMock = jest.fn();
    const $axios: object = { $get, interceptors: { response: { use: useMock } } };
    const mockAxios: NuxtAxiosInstance = $axios as NuxtAxiosInstance;
    apiService = new ApiService(mockAxios);
  });

  describe('constructor()', () => {
    it('should call use methods of response interceptor with undefined onFulfilled callback', () => {
      // then
      expect(useMock).toHaveBeenCalled();
      expect(useMock.mock.calls[0][0]).toBeUndefined();
    });
    it('should call use methods of response interceptor with defined onRejected callback that return data from error', () => {
      // given
      const rejectCallback: (error: AxiosError) => Promise<unknown> = useMock.mock.calls[0][1];
      const error: AxiosError = {} as AxiosError;
      error.response = { data: 'An error data' } as AxiosResponse;

      // when
      const result: Promise<unknown> = rejectCallback(error);

      // then
      expect(result).rejects.toBe('An error data');
    });
  });

  describe('getDummies()', () => {
    it('should call api', async () => {
      // given
      const expected: DummyResponseInterface = {
        id: 123,
        value: 'a value',
      };

      $get.mockReturnValue(Promise.resolve(expected));

      // when
      const result: DummyResponseInterface[] = await apiService.getDummies();

      // then
      expect(result).toBe(expected);
      expect($get).toHaveBeenCalledWith('/api/dummy');
    });
  });
});
