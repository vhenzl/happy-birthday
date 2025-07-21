import { z } from 'zod';

const CommandSchema = z.object({
  __name: z.string(),
});

export type Command = z.infer<typeof CommandSchema>;

export function createCommandSchema<const TName extends string, TShape extends z.core.$ZodShape>(
  name: TName,
  shape: TShape,
) {
  return CommandSchema.extend({
    __name: z.literal(name),
    ...shape,
  });
}

export type CommandHandler<TCommand, TResult> = (command: TCommand) => Promise<TResult>;

export class InvalidCommandError extends Error {
  constructor(
    public readonly errors?: {
      readonly path: (number | string | symbol)[];
      readonly message: string;
    }[],
  ) {
    super('Invalid command');
    this.name = 'InvalidCommandError';
  }
}
