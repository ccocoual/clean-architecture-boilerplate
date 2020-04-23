import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { DummyResponseInterface } from '../../../../back/src/infrastructure/rest/models/dummy-response.interface';
import CabDummyListItem from '../cab-dummy-list-item.vue';

describe('components/dummys/cab-dummy-list-item', () => {
  const dummy: DummyResponseInterface = {
    id: 123,
    value: 'a value',
  } as DummyResponseInterface;

  let propsData: {
    dummy: DummyResponseInterface;
  };

  beforeEach(() => {
    propsData = {
      dummy,
    };
  });

  describe('value', () => {
    it('should contain a span with value', () => {
      // given
      propsData.dummy.value = 'A value';

      // when
      const cabDummyListItemWrapper: Wrapper<Vue> = shallowMount(CabDummyListItem, {
        propsData,
      });

      // then
      // @ts-ignore
      expect(cabDummyListItemWrapper.find('span').text()).toStrictEqual(propsData.dummy.value);
    });
  });
});
