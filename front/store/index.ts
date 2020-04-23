import { Context } from '@nuxt/types';
import { ActionContext, ActionTree } from 'vuex';
import { DummyModuleStateInterface } from '~/store/dummy-module';

export interface RootStateInterface {
  'dummy-module': DummyModuleStateInterface;
}

export const actions: ActionTree<RootStateInterface, object> = {
  async nuxtServerInit(actionContext: ActionContext<RootStateInterface, object>, context: Context): Promise<void> {
    await actionContext.dispatch('dummy-module/setDummies', { apiService: context.app.$apiService });
  },
};
