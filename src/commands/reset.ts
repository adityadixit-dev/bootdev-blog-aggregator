import { checkArgsOrThrow } from ".";
import { deleteAllUsers } from "../db/queries/users";
import { DeleteFailedError } from "../error_classes";

export async function handlerReset(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  checkArgsOrThrow(cmdName, 0, ...args);

  try {
    await deleteAllUsers();
    console.log("All users deleted");
  } catch (err) {
    const errMsg = "Unable to delete all Users";
    console.log(errMsg, err);
    throw new DeleteFailedError(errMsg);
  }
}
