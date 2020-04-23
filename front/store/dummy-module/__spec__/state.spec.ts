import { DummyResponseInterface } from '../../../../back/src/infrastructure/rest/models/dummy-response.interface';
import state from '~/store/dummy-module/state';
import { DummyModuleStateInterface } from '~/store/dummy-module';

describe('store/dummy-module/state()', () => {
  it('should return default state', () => {
    // given
    const expected: DummyModuleStateInterface = {
      dummies: [] as DummyResponseInterface[],
    } as DummyModuleStateInterface;

    // when
    const result: DummyModuleStateInterface = state();

    // then
    expect(result).toStrictEqual(expected);
  });
});
