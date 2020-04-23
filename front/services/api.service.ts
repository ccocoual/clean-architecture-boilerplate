import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosError } from 'axios';
import { DummyResponseInterface } from '../../back/src/infrastructure/rest/models/dummy-response.interface';

export default class ApiService {
  private readonly $axios: NuxtAxiosInstance;

  constructor($axios: NuxtAxiosInstance) {
    this.attachResponseInterceptors($axios);
    this.$axios = $axios;
  }

  getDummies(): Promise<DummyResponseInterface[]> {
    return this.$axios.$get('/api/dummy');
  }

  // PRIVATE METHODS

  private attachResponseInterceptors($axios: NuxtAxiosInstance): void {
    $axios.interceptors.response.use(undefined, (error: AxiosError) => {
      return Promise.reject(error && error.response && error.response.data);
    });
  }
}
