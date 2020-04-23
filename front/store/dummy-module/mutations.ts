import { DummyResponseInterface } from '../../../back/src/infrastructure/rest/models/dummy-response.interface';
import { DummyModuleStateInterface } from './index';

export default {
  SET_DUMMIES(currentState: DummyModuleStateInterface, dummies: DummyResponseInterface[]): void {
    currentState.dummies = dummies;
  },
};
