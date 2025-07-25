import { CircleId } from '../circles/circle';
import { Branded } from '../shared-kernel/branded-types';
import { BusinessError } from '../shared-kernel/BusinessError';
import { SpecialDate } from './special-date';

export type PersonId = Branded<string, 'PersonId'>;

export class Person {
  #id: PersonId;
  #name: string;
  #circleId: CircleId;
  #specialDates: SpecialDate[];

  constructor(
    id: PersonId,
    name: string,
    circleId: CircleId,
    specialDates: SpecialDate[],
  ) {
    name = name.trim();
    if (name === '') {
      throw new BusinessError('Person name cannot be empty');
    }
    this.#id = id;
    this.#name = name;
    this.#circleId = circleId;
    this.#specialDates = specialDates;
  }

  get id(): PersonId {
    return this.#id;
  }
}
