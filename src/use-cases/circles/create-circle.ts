import { Circle, CircleId, Colour } from '@/domain/circles/circle';
import { CircleRepository } from '@/domain/circles/circle-repository';
import * as uuid from 'uuid';
import { z } from 'zod';
import { CommandHandler, createCommandSchema } from '../command';

export const CreateCircleCommandSchema = createCommandSchema('CreateCircle', {
  name: z.string().trim().min(1, 'Name cannot be empty'),
  colour: z.string().trim().toUpperCase().length(6).regex(/^[0-9A-F]{6}$/, 'Colour must be a valid hex code'),
});

export type CreateCircleCommand = z.infer<typeof CreateCircleCommandSchema>;

type Dependencies = {
  circleRepository: CircleRepository;
};

export function createCircleCommandHandler({
  circleRepository,
}: Dependencies): CommandHandler<CreateCircleCommand, string> {
  return async (command) => {
    const id = uuid.v7() as CircleId;
    const colour = new Colour(command.colour);
    const circle = new Circle(id, command.name, colour);
    await circleRepository.add(circle);
    return circle.id;
  };
}
