import { checkArgsOrThrow } from ".";
import { removeFeedForUser } from "../db/queries/feed-follows";
import { getFeedFromUrl } from "../db/queries/feeds";
import { UserSelect } from "../db/queries/users";

export async function handlerUnfollow(
  cmdName: string,
  user: UserSelect,
  ...args: string[]
): Promise<void> {
  checkArgsOrThrow(cmdName, 1, ...args);

  const feedUrl = args[0];
  const feed = await getFeedFromUrl(feedUrl);
  const result = await removeFeedForUser(feed, user);
  if (!result) {
    console.log("Unable to remove feed from user in feedfollows");
  }
}
