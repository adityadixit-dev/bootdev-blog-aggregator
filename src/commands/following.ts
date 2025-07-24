import { checkArgsOrThrow } from ".";
import { readConfig } from "../config";
import { getFeedFollowsForUser } from "../db/queries/feed-follows";
import { getUserByName, UserSelect } from "../db/queries/users";

export async function handlerFollowing(
  cmdName: string,
  user: UserSelect,
  ...args: string[]
): Promise<void> {
  checkArgsOrThrow(cmdName, 0, ...args);

  const feedFollowForUser = await getFeedFollowsForUser(user);

  console.log(`User ${feedFollowForUser.userName} has the following feeds`);

  feedFollowForUser.feedsForUser.map((currFeed) => console.log(currFeed));
}
