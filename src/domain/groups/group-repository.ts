import { Group, GroupId } from './group';


export interface GroupRepository {
  getById(id: GroupId): Promise<Group>;
  findById(id: GroupId): Promise<Group | null>;
  getAll(): Promise<readonly Group[]>;
  add(type: Group): Promise<void>;
}
