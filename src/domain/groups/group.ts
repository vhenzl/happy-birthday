import { Branded } from '../shared-kernel/branded-types';
import { BusinessError } from '../shared-kernel/BusinessError';

export type GroupId = Branded<string, 'GroupId'>;

export class Group {
  #id: GroupId;
  #name: string;
  #colour: Colour;

  constructor(id: GroupId, name: string, colour: Colour) {
    name = name.trim();
    if (name === '') {
      throw new BusinessError('Group name cannot be empty');
    }
    this.#id = id;
    this.#name = name;
    this.#colour = colour;
  }

  get id(): GroupId {
    return this.#id;
  }
}

export class Colour {
  #hex: string;

  constructor(hex: string) {
    hex = hex.trim().toUpperCase();
    if (!/^#[0-9A-F]{6}$/.test(hex)) {
      throw new BusinessError('Invalid hex colour');
    }
    this.#hex = hex;
  }

  get hex(): string {
    return this.#hex;
  }

  equals(other: Colour): boolean {
    return this.#hex === other.#hex;
  }
}


