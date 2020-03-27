import { isEmpty } from 'lodash';
import { DummyInterface } from './dummy.interface';
import { InvalidDummyError } from './invalid-dummy.error';
import { DummyId } from './type-aliases';

export class Dummy implements DummyInterface {
  id: DummyId;
  value: string;

  constructor(value: string) {
    if (isEmpty(value)) {
      throw new InvalidDummyError('value cannot be null or empty');
    }
    this.value = value;
  }
}
