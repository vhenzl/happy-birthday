import { Branded } from '../shared-kernel/branded-types';
import { BusinessError } from '../shared-kernel/BusinessError';

export type CircleId = Branded<string, 'CircleId'>;

export class Circle {
  #id: CircleId;
  #name: string;
  #colour: Colour;

  constructor(id: CircleId, name: string, colour: Colour) {
    name = name.trim();
    if (name === '') {
      throw new BusinessError('Circle name cannot be empty');
    }
    this.#id = id;
    this.#name = name;
    this.#colour = colour;
  }

  get id(): CircleId {
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


