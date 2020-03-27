import { ApiProperty } from '@nestjs/swagger';
import { DummyInterface } from '../../../domain/dummy.interface';
import { CommonTypeAliases } from '../common-models/common-type-aliases';

export class DummyResponseSwagger implements DummyInterface {
  @ApiProperty()
  id: CommonTypeAliases.DummyId;
  @ApiProperty()
  value: string;
}
