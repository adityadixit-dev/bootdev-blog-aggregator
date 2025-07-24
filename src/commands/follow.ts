import { checkArgsOrThrow } from ".";
import { readConfig } from "../config";
import { createFeedFollow } from "../db/queries/feed-follows";
import { getFeedFromUrl } from "../db/queries/feeds";
import { getUserByName, UserSelect } from "../db/queries/users";

export async function handlerFollow(
  cmdName: string,
  user: UserSelect,
  ...args: string[]
): Promise<void> {
  checkArgsOrThrow(cmdName, 1, ...args);

  const url: string = args[0];

  const feed = await getFeedFromUrl(url);

  if (!feed) {
    throw new Error("Feed does not exist.. add feed first");
  }

  const feedFollow = await createFeedFollow(feed, user);

  console.log(
    `Feed : ${feedFollow.feedName} is attached to User: ${feedFollow.userName}`,
  );
}
