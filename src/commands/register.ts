import { checkArgsOrThrow } from ".";
import { setUser } from "../config";
import { createUser, getUserByName } from "../db/queries/users";
import { UserAlreadyExistsError, UserNotCreatedError } from "../error_classes";

export async function handlerRegister(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  checkArgsOrThrow(cmdName, 1, ...args);

  const username = args[0];

  const existingUser = await getUserByName(username);
  if (!existingUser) {
    const newUser = await createUser(username);
    if (!newUser) {
      throw new UserNotCreatedError();
    }
    setUser(username);
    console.log(`User "${newUser.name}" create with id "${newUser.id}"`);
    return;
  }
  throw new UserAlreadyExistsError();
}
