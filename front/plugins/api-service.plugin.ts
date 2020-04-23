import { Context, Plugin } from '@nuxt/types';
import ApiService from '~/services/api.service';

declare module 'vue/types/vue' {
  interface Vue {
    $apiService: ApiService;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $apiService: ApiService;
  }
}

const apiServicePlugin: Plugin = (ctx: Context, inject: (key: string, value: ApiService) => void): Promise<void> | void => {
  // Use `inject` to make service available in Context and Vue instance
  inject('apiService', new ApiService(ctx.$axios));
};

export default apiServicePlugin;
