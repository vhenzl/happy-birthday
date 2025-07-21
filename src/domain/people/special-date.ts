import { Branded } from '../shared-kernel/branded-types';
import { BusinessError } from '../shared-kernel/BusinessError';
import { SpecialDateTypeId } from '../special-date-types/special-date-type';

export type SpecialDateId = Branded<string, 'SpecialDateId'>;

export class SpecialDate {
  #id: SpecialDateId;
  #typeId: SpecialDateTypeId;
  #date: MonthDay;
  #year: Year | null;

  constructor(
    id: SpecialDateId,
    typeId: SpecialDateTypeId,
    date: MonthDay,
    year: Year | null,
  ) {
    if (year !== null && !date.isValidForYear(year.value)) {
      throw new BusinessError('Date is not valid for the specified year');
    }
    this.#id = id;
    this.#typeId = typeId;
    this.#date = date;
    this.#year = year;
  }

  get id(): SpecialDateId {
    return this.#id;
  }
}

export class Year {
  #value: number;

  constructor(value: number) {
    if (!Number.isInteger(value)) {
      throw new BusinessError('Year must be an integer');
    }
    if (value > new Date().getFullYear()) {
      throw new BusinessError('Year cannot be in the future');
    }
    if (value < 0) {
      throw new BusinessError('Year cannot be negative');
    }
    this.#value = value === null ? NaN : value;
  }

  get value(): number {
    return this.#value;
  }
}

export class MonthDay {
  #month: MonthNumber;
  #day: DayNumber;

  constructor(month: number, day: number) {
    if (!isValidMonth(month)) {
      throw new BusinessError('Month must be between 1 and 12');
    }
    if (!isValidDayForMonth(month, day)) {
      throw new BusinessError('Day must be between 1 and 31');
    }

    this.#month = month;
    this.#day = day;
  }

  get month(): MonthNumber {
    return this.#month;
  }

  get day(): DayNumber {
    return this.#day;
  }

  isValidForYear(year: number): boolean {
    if (this.#month === 2) {
      if (isLeapYear(year)) {
        return this.#day <= 29;
      } else {
        return this.#day <= 28;
      }
    }
    return true;
  }

  public equals(other: MonthDay): boolean {
    return this.#month === other.#month && this.#day === other.#day;
  }
}

type MonthNumber = Branded<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12, 'MonthNumber'>;
type DayNumber = Branded<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31, 'DayNumber'>;

function isValidDayForMonth(
  month: MonthNumber,
  day: number,
): day is DayNumber {
  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day >= 1 && day <= daysInMonth[month - 1];
}

function isValidMonth(month: number): month is MonthNumber {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(month);
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
