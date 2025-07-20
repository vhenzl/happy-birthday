import { Emoji, SpecialDateType, SpecialDateTypeId } from '@/domain/special-date-types/special-date-type';
import { SpecialDateTypeRepository } from '@/domain/special-date-types/special-date-type-repository';
import * as uuid from 'uuid';
import { Command, CommandHandler } from '../command';

export interface CreateSpecialDateTypeCommand extends Command {
  __name: 'CreateSpecialDateType';
  name: string;
  emoji: string;
}

type Dependencies = {
  specialDateTypeRepository: SpecialDateTypeRepository;
};

export function createSpecialDateTypeCommandHandler({
  specialDateTypeRepository,
}: Dependencies): CommandHandler<CreateSpecialDateTypeCommand, string> {
  return async (command) => {
    const id = uuid.v7() as SpecialDateTypeId;
    const emoji = new Emoji(command.emoji);
    const specialDateType = new SpecialDateType(id, command.name, emoji);
    await specialDateTypeRepository.add(specialDateType);
    return specialDateType.id;
  };
}
