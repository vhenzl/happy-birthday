import { Circle, CircleId, Colour } from '@/domain/circles/circle';
import { CircleRepository } from '@/domain/circles/circle-repository';
import * as uuid from 'uuid';
import { Command, CommandHandler } from '../command';

export interface CreateCircleCommand extends Command {
  __name: 'CreateCircle';
  name: string;
  colour: string;
}

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
