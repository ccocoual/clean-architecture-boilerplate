import { Context, NuxtAppOptions } from '@nuxt/types';
import { ActionContext } from 'vuex';
import ApiService from '~/services/api.service';
import { actions } from '~/store';
import { DummyModuleStateInterface } from '~/store/dummy-module';
import { SetDummiesActionPayload } from '~/store/dummy-module/actions';

describe('store/index', () => {
  describe('actions', () => {
    describe('nuxtServerInit()', () => {
      let mockActionContext: ActionContext<DummyModuleStateInterface, object>;
      let mockContext: Context;

      beforeEach(() => {
        mockActionContext = {} as ActionContext<DummyModuleStateInterface, object>;

        mockActionContext.dispatch = jest.fn();
        mockContext = {} as Context;
        mockContext.app = {} as NuxtAppOptions;
      });

      describe('dispatch()', () => {
        it('should be called with setDummies action and ApiService as payload', async () => {
          // given
          const mockApiService: ApiService = {} as ApiService;
          mockContext.app.$apiService = mockApiService;

          // when
          // @ts-ignore
          await actions.nuxtServerInit(mockActionContext, mockContext);

          // then
          const expectedPayload: SetDummiesActionPayload = {
            apiService: mockApiService,
          };
          expect(mockActionContext.dispatch).toHaveBeenCalledWith('dummy-module/setDummies', expectedPayload);
        });
      });
    });
  });
});
