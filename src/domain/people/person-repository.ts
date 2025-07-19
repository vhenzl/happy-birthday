import { Person, PersonId } from './person';

export interface PersonRepository {
  getById(id: PersonId): Promise<Person>;
  findById(id: PersonId): Promise<Person | null>;
  getAll(): Promise<readonly Person[]>;
  add(type: Person): Promise<void>;
}
