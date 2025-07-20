export interface Command {
  __name: string;
}

export type CommandHandler<TCommand, TResult> = (command: TCommand) => Promise<TResult>;
