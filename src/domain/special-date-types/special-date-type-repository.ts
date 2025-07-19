import { SpecialDateType, SpecialDateTypeId } from './special-date-type';


export interface SpecialDateTypeRepository {
  getById(id: SpecialDateTypeId): Promise<SpecialDateType>;
  findById(id: SpecialDateTypeId): Promise<SpecialDateType | null>;
  getAll(): Promise<readonly SpecialDateType[]>;
  add(type: SpecialDateType): Promise<void>;
}
