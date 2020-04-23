import { shallowMount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import { DummyResponseInterface } from '../../../../back/src/infrastructure/rest/models/dummy-response.interface';
import CabDummyList from '../cab-dummy-list.vue';
import CabDummyListItem from '../cab-dummy-list-item.vue';

describe('components/dummy/cab-dummy-list', () => {
  let $t: jest.Mock;
  let propsData: {
    dummies: DummyResponseInterface[];
  };

  beforeEach(() => {
    $t = jest.fn();
    propsData = {
      dummies: [],
    };
  });

  it('should contain as many cab dummy list item components as dummies', () => {
    // given
    propsData.dummies = [
      {
        value: 'A first dummy',
      } as DummyResponseInterface,
      {
        value: 'A second dummy',
      } as DummyResponseInterface,
    ];

    // when
    const cabDummyListWrapper: Wrapper<Vue> = shallowMount(CabDummyList, {
      mocks: { $t },
      propsData,
    });

    // then
    // @ts-ignore
    expect(cabDummyListWrapper.findAll(CabDummyListItem).at(0).vm.dummy).toStrictEqual({
      value: 'A first dummy',
    });

    // @ts-ignore
    expect(cabDummyListWrapper.findAll(CabDummyListItem).at(1).vm.dummy).toStrictEqual({
      value: 'A second dummy',
    });
  });
});
