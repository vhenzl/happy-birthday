import { Circle, CircleId } from './circle';


export interface CircleRepository {
  getById(id: CircleId): Promise<Circle>;
  findById(id: CircleId): Promise<Circle | null>;
  getAll(): Promise<readonly Circle[]>;
  add(type: Circle): Promise<void>;
}
