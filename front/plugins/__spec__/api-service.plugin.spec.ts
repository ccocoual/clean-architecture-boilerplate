import { Context } from '@nuxt/types';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import apiServicePlugin from '../api-service.plugin';
import ApiService from '~/services/api.service';

jest.mock('~/services/api.service');

describe('plugins/ApiServicePlugin', () => {
  beforeEach(() => {
    (ApiService as jest.Mock).mockClear();
  });

  it('should inject instance of ApiService containing $axios', () => {
    // given
    const $axios: NuxtAxiosInstance = {} as NuxtAxiosInstance;
    const ctx: Context = { $axios } as Context;
    const inject: jest.Mock = jest.fn();
    const mockApiService: ApiService = {} as ApiService;
    (ApiService as jest.Mock).mockImplementation(() => mockApiService);

    // when
    apiServicePlugin(ctx, inject);

    // then
    expect(ApiService as jest.Mock).toHaveBeenCalledWith($axios);
    expect(inject).toHaveBeenCalledWith('apiService', mockApiService);
  });
});
