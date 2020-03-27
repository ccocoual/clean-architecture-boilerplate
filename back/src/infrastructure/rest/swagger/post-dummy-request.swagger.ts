import { ApiProperty } from '@nestjs/swagger';
import { PostDummyRequestInterface } from '../models/post-dummy-request.interface';

export class PostDummyRequestSwagger implements PostDummyRequestInterface {
  @ApiProperty()
  value: string;
}
