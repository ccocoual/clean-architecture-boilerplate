import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { ItemNotFoundError } from '../../../domain/common-errors/item-not-found.error';
import { ItemNotFoundErrorResponseInterface } from './models/item-not-found-error-response.interface';

@Catch(ItemNotFoundError)
export class ItemNotFoundErrorFilter implements ExceptionFilter {
  catch(exception: ItemNotFoundError, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const status: HttpStatus = HttpStatus.NOT_FOUND;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      name: exception.name,
      message: exception.message,
    } as ItemNotFoundErrorResponseInterface);
  }
}
