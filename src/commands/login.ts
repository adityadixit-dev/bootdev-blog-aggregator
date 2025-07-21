import { setUser } from "../config";
import { checkArgsOrThrow } from ".";
import { getUserByName } from "../db/queries/users";
import { UserDoesNotExistError } from "../error_classes";

export async function handlerLogin(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  checkArgsOrThrow(cmdName, 1, ...args);

  const username = args[0];

  const existingUser = await getUserByName(username);
  if (!existingUser) {
    throw new UserDoesNotExistError();
  }

  setUser(username);
  console.log(`User ${username} is now active`);
}
