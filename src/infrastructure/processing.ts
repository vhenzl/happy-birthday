import { CommandHandler, InvalidCommandError } from '@/use-cases/command';
import { ZodType } from 'zod';

export function withValidation<TCommand, TResult>(
  schema: ZodType<TCommand>,
  handler: CommandHandler<TCommand, TResult>,
): CommandHandler<TCommand, TResult> {
  return async (command) => {
    const result = schema.safeParse(command);
    if (!result.success) {
      throw new InvalidCommandError(result.error.issues.map(issue => ({
        path: issue.path,
        message: issue.message,
      })));
    }
    return handler(command);
  };
}

export function withLogging<TCommand, TResult>(
  handler: CommandHandler<TCommand, TResult>,
): CommandHandler<TCommand, TResult> {
  return async (command) => {
    try {
      console.log('Processing command:', command);
      const result = await handler(command);
      console.log('Command processed successfully:', result);
      return result;
    } catch (error) {
      console.error('Command processing failed:', error);
      throw error;
    }
  };
}
