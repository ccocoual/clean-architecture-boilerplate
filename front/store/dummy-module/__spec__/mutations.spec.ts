import { DummyResponseInterface } from '../../../../back/src/infrastructure/rest/models/dummy-response.interface';
import { DummyModuleStateInterface } from '../index';
import mutations from '../mutations';

describe('store/dummy-module/mutations', () => {
  describe('SET_DUMMIES()', () => {
    it('should set dummies property on state', () => {
      // given
      const state: DummyModuleStateInterface = { dummies: [] as DummyResponseInterface[] };
      const dummies: DummyResponseInterface[] = [
        {
          id: 123,
          value: 'a-value',
        },
      ];

      // when
      mutations.SET_DUMMIES(state, dummies);

      // then
      expect(state).toHaveProperty('dummies', dummies);
    });
  });
});
