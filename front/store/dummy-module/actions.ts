import { ActionContext } from 'vuex';
import { DummyResponseInterface } from '../../../back/src/infrastructure/rest/models/dummy-response.interface';
import { DummyModuleStateInterface } from './index';
import ApiService from '~/services/api.service';

export interface SetDummiesActionPayload {
  apiService: ApiService;
  params?: {
    [key: string]: string;
  };
}

export default {
  async setDummies(actionContext: ActionContext<DummyModuleStateInterface, object>, setDummiesActionPayload: SetDummiesActionPayload): Promise<void> {
    const { apiService }: SetDummiesActionPayload = setDummiesActionPayload;

    const dummies: DummyResponseInterface[] = await apiService.getDummies();
    actionContext.commit('SET_DUMMIES', dummies);
  },
};
