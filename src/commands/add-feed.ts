import { readConfig } from "../config";
import { createFeed } from "../db/queries/feeds";
import { getUserByName } from "../db/queries/users";
import { fetchFeed } from "../feeds/fetch-feed";
import { RSSFeed } from "../feeds/feed-types";
import { checkArgsOrThrow } from ".";
import { printFeed } from "../feeds/print-feed";

export async function handlerAddFeed(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  checkArgsOrThrow(cmdName, 2, ...args);

  const feedName: string = args[0];
  const feedUrl: string = args[1];

  const currUserName = readConfig().currentUserName;
  const user = await getUserByName(currUserName);

  if (!user) {
    throw new Error("Unable to get User");
  }

  const feed: RSSFeed = await fetchFeed(feedUrl);

  if (!feed) {
    throw new Error("Feed not valid");
  }

  const result = await createFeed(feedName, feedUrl, user);
  if (!result) {
    throw new Error("Unable to create Feed");
  }

  printFeed(result, user);
}
