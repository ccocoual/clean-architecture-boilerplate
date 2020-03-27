import { ApiProperty } from '@nestjs/swagger';
import { StatusCode } from '../filters/models/default-error-response.interface';
import { ItemNotFoundErrorResponseInterface } from '../filters/models/item-not-found-error-response.interface';

export class DummyNotFoundResponseSwagger implements ItemNotFoundErrorResponseInterface {
  @ApiProperty()
  message: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  statusCode: StatusCode;

  @ApiProperty()
  timestamp: string;
}
