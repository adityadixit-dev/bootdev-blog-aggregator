import {
  WrongArguementNumberError,
  CommandNotFoundError,
} from "../error_classes.js";

export type CommandHandler = (
  cmdName: string,
  ...args: string[]
) => Promise<void>;
export type CommandsRegistry = Record<string, CommandHandler>;

export async function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
) {
  if (cmdName in registry) {
    try {
      const handler = registry[cmdName];
      await handler(cmdName, ...args);
    } catch (err) {
      if (err instanceof WrongArguementNumberError) {
        console.log("error in Run Command");
        console.log(err.message);
      }

      throw err;
    }
  } else {
    throw new CommandNotFoundError(
      `Command ${cmdName} was not found in registry`,
    );
  }
}

export function registerCommand(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler,
) {
  registry[cmdName] = handler;
}

export function checkArgsOrThrow(
  cmdName: string,
  expectedArgs: number,
  ...args: string[]
): void {
  if (args.length !== expectedArgs) {
    throw new WrongArguementNumberError(
      `Command "${cmdName}" expects exactly ${expectedArgs} arguement(s).`,
    );
  }
}
