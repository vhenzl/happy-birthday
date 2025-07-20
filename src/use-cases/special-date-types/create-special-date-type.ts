import { Emoji, SpecialDateType, SpecialDateTypeId } from '@/domain/special-date-types/special-date-type';
import { SpecialDateTypeRepository } from '@/domain/special-date-types/special-date-type-repository';
import * as uuid from 'uuid';
import { z } from 'zod';
import { CommandHandler, createCommandSchema } from '../command';

export const CreateSpecialDateTypeCommandSchema = createCommandSchema('CreateSpecialDateType', {
  name: z.string().trim().min(1, 'Name cannot be empty'),
  emoji: z.string().trim().min(1, 'Emoji cannot be empty'),
});

export type CreateSpecialDateTypeCommand = z.infer<typeof CreateSpecialDateTypeCommandSchema>;

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
