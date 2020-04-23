import Vue from 'vue';
import Vuex, { ModuleTree, Store } from 'vuex';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import { Context } from '@nuxt/types';
import { DummyResponseInterface } from '../../../../back/src/infrastructure/rest/models/dummy-response.interface';
import DummyPage from '../index.vue';
import ApiService from '~/services/api.service';
import CabDummyList from '~/components/dummy/cab-dummy-list.vue';
import { RootStateInterface } from '~/store';

describe('pages/dummy/index', () => {
  let localVue: typeof Vue;

  let ctx: Context;
  let getDummiesMock: jest.Mock;
  let setDummiesMock: jest.Mock;

  let dispatchMock: jest.Mock;

  let $apiService: ApiService;

  let store: Store<RootStateInterface>;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
  });

  beforeEach(() => {
    $apiService = {} as ApiService;
    dispatchMock = jest.fn();

    ctx = ({
      app: { $apiService },
      store: ({ dispatch: dispatchMock } as unknown) as Store<unknown>,
    } as unknown) as Context;

    getDummiesMock = jest.fn();
    setDummiesMock = jest.fn();

    store = new Vuex.Store({
      modules: {
        'dummy-module': {
          namespaced: true,
          getters: {
            getDummies: getDummiesMock,
          },
          actions: {
            setDummies: setDummiesMock,
          },
        },
      } as ModuleTree<RootStateInterface>,
    });
  });

  describe('asyncData()', () => {
    it('should call store action to retrieve dummies asynchronously', async () => {
      // given
      const dummyPageWrapper: Wrapper<Vue> = shallowMount(DummyPage, { localVue, store });

      // when
      // @ts-ignore
      await dummyPageWrapper.vm.$options.asyncData(ctx);

      // then
      expect(dispatchMock).toHaveBeenCalledWith('dummy-module/setDummies', { apiService: $apiService });
    });
  });

  describe('dummies', () => {
    it('should display CabDummyList component with dummies from store', () => {
      // given
      const expected: DummyResponseInterface = { value: 'A dummy value' } as DummyResponseInterface;
      getDummiesMock.mockReturnValue(expected);

      // when
      const dummyPageWrapper: Wrapper<Vue> = shallowMount(DummyPage, { localVue, store });

      // then
      // @ts-ignore
      expect(dummyPageWrapper.find(CabDummyList).vm.dummies).toStrictEqual(expected);
    });
  });
});
