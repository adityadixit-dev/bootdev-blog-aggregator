import { checkArgsOrThrow } from ".";
import { readConfig } from "../config";
import { getAllUsers } from "../db/queries/users";

export async function handlerUsers(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  checkArgsOrThrow(cmdName, 0, ...args);

  const allUsers = await getAllUsers();
  const currUser = readConfig().currentUserName;

  for (const user of allUsers) {
    const username = user.name;
    let toDisplayUser = `* ${username}`;
    if (username === currUser) {
      toDisplayUser += " (current)";
    }
    console.log(toDisplayUser);
  }
}
