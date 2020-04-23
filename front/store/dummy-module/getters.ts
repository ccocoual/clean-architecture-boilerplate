import { DummyModuleStateInterface } from '~/store/dummy-module/index';
import { DummyResponseInterface } from '../../../back/src/infrastructure/rest/models/dummy-response.interface';

export default {
  getDummies(state: DummyModuleStateInterface): DummyResponseInterface[] {
    return state.dummies;
  },
};
