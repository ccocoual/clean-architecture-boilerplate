import { DummyModuleStateInterface } from '~/store/dummy-module';
import { DummyResponseInterface } from '../../../../back/src/infrastructure/rest/models/dummy-response.interface';
import getters from '../getters';

describe('store/dummy-module/getters', () => {
  let state: DummyModuleStateInterface;
  beforeEach(() => {
    state = {
      dummies: [
        {
          id: 123,
          value: 'a-value',
        },
      ],
    };
  });

  describe('getDummies', () => {
    it('should return dummies from state', () => {
      // when
      const result: DummyResponseInterface[] = getters.getDummies(state);

      // then
      expect(result).toStrictEqual([
        {
          id: 123,
          value: 'a-value',
        },
      ]);
    });
  });
});
