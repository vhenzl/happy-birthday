import { Branded } from '../shared-kernel/branded-types';
import { BusinessError } from '../shared-kernel/BusinessError';

export type SpecialDateTypeId = Branded<string, 'SpecialDateTypeId'>;

export class SpecialDateType {
  #id: SpecialDateTypeId;
  #name: string;
  #emoji: Emoji;

  constructor(
    id: SpecialDateTypeId,
    name: string,
    emoji: Emoji,
  ) {
    name = name.trim();
    if (name === '') {
      throw new BusinessError('Type name cannot be empty');
    }
    this.#id = id;
    this.#name = name;
    this.#emoji = emoji;
  }

  get id(): SpecialDateTypeId {
    return this.#id;
  }
}

export class Emoji {
  #value: string;

  constructor(value: string) {
    if (!isValidSingleEmoji(value)) {
      throw new BusinessError('Invalid emoji');
    }
    this.#value = value;
  }

  get value(): string {
    return this.#value;
  }

  equals(other: Emoji): boolean {
    return this.#value === other.value;
  }
}

function isValidSingleEmoji(value: string): boolean {
  // TODO: enforce single emoji
  // TODO: use emoji-regex or similar library
  return value.length > 0 &&
    /\p{Emoji}/u.test(value);
}

