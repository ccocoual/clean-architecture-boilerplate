import { ArgumentsHost } from '@nestjs/common';
import { ItemNotFoundError } from '../../../../domain/common-errors/item-not-found.error';
import { ItemNotFoundErrorFilter } from '../item-not-found-error.filter';
import { ItemNotFoundErrorResponseInterface } from '../models/item-not-found-error-response.interface';

describe('infrastructure/rest/filters/ItemNotFoundErrorFilter', () => {
  let mockArgumentsHost: ArgumentsHost;
  let mockStatus: jest.Mock;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockStatus = jest.fn();
    mockJson = jest.fn();

    mockStatus.mockImplementation(() => {
      return {
        json: mockJson,
      };
    });

    mockArgumentsHost = {
      switchToHttp: () => ({
        getResponse: () => ({
          status: mockStatus,
        }),
      }),
    } as ArgumentsHost;
  });

  describe('catch()', () => {
    it('should call response status method with http not found status code', () => {
      // given
      const itemNotFoundError: ItemNotFoundError = {} as ItemNotFoundError;
      const expected: number = 404;

      // when
      new ItemNotFoundErrorFilter().catch(itemNotFoundError, mockArgumentsHost);

      // then
      expect(mockStatus).toHaveBeenCalledWith(expected);
    });

    it('should call response status json method with body from item not found error', () => {
      // given
      const fixedDate: Date = new Date('2017-06-13T04:41:20');
      // @ts-ignore
      jest.spyOn(global, 'Date').mockImplementationOnce(() => fixedDate);

      const itemNotFoundError: ItemNotFoundError = {
        name: 'ItemNotFoundError',
        message: 'An item not found error',
      } as ItemNotFoundError;

      const expected: ItemNotFoundErrorResponseInterface = {
        statusCode: 404,
        timestamp: fixedDate.toISOString(),
        name: 'ItemNotFoundError',
        message: 'An item not found error',
      };

      // when
      new ItemNotFoundErrorFilter().catch(itemNotFoundError, mockArgumentsHost);

      // then
      expect(mockJson).toHaveBeenCalledWith(expected);
    });
  });
});
