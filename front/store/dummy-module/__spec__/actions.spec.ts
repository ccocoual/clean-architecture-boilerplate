import { ActionContext } from 'vuex';

import { DummyResponseInterface } from '../../../../back/src/infrastructure/rest/models/dummy-response.interface';
import actions, { SetDummiesActionPayload } from '../actions';

import { DummyModuleStateInterface } from '../index';

import ApiService from '~/services/api.service';

describe('store/dummy-module/actions', () => {
  describe('setDummies()', () => {
    let mockApiService: ApiService;
    let mockActionContext: ActionContext<DummyModuleStateInterface, object>;
    beforeEach(() => {
      mockApiService = {} as ApiService;
      mockApiService.getDummies = jest.fn();
      mockActionContext = {} as ActionContext<DummyModuleStateInterface, object>;

      mockActionContext.commit = jest.fn();
    });
    it('should call apiService', () => {
      // given
      (mockApiService.getDummies as jest.Mock).mockReturnValue(
        Promise.resolve([
          {
            id: 123,
            value: 'a-value',
          },
        ] as DummyResponseInterface[])
      );
      const actionPayload: SetDummiesActionPayload = {
        apiService: mockApiService,
      } as SetDummiesActionPayload;

      // when
      actions.setDummies(mockActionContext, actionPayload);

      // then
      expect(mockApiService.getDummies).toHaveBeenCalled();
    });

    it('should call commit from context with mutation and dummies', async () => {
      // given
      const expected: DummyResponseInterface[] = [
        {
          id: 123,
          value: 'a-value',
        },
      ] as DummyResponseInterface[];
      (mockApiService.getDummies as jest.Mock).mockReturnValue(Promise.resolve(expected));

      const actionPayload: SetDummiesActionPayload = {
        apiService: mockApiService,
      } as SetDummiesActionPayload;

      // when
      await actions.setDummies(mockActionContext, actionPayload);

      // then
      expect(mockActionContext.commit).toHaveBeenCalledWith('SET_DUMMIES', expected);
    });
  });
});
