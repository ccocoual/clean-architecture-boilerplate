import { DummyResponseInterface } from '../../../back/src/infrastructure/rest/models/dummy-response.interface';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

export interface DummyModuleStateInterface {
  dummies: DummyResponseInterface[];
}

export default { state, getters, mutations, actions };
