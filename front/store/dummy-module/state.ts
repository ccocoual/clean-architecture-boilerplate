import { DummyResponseInterface } from '../../../back/src/infrastructure/rest/models/dummy-response.interface';
import { DummyModuleStateInterface } from './index';

export default () =>
  ({
    dummies: [] as DummyResponseInterface[],
  } as DummyModuleStateInterface);
