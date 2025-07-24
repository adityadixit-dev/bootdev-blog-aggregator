import { readConfig } from "../config";
import { createFeed } from "../db/queries/feeds";
import { getUserByName, UserSelect } from "../db/queries/users";
import { fetchFeed } from "../feeds/fetch-feed";
import { RSSFeed } from "../feeds/feed-types";
import { checkArgsOrThrow } from ".";
import { printFeed } from "../feeds/print-feed";
import { createFeedFollow } from "../db/queries/feed-follows";

export async function handlerAddFeed(
  cmdName: string,
  user: UserSelect,
  ...args: string[]
): Promise<void> {
  checkArgsOrThrow(cmdName, 2, ...args);

  const feedName: string = args[0];
  const feedUrl: string = args[1];

  const feed: RSSFeed = await fetchFeed(feedUrl);

  if (!feed) {
    console.log("feed not valid");
    throw new Error("Feed not valid");
  }

  const newFeed = await createFeed(feedName, feedUrl, user);
  if (!newFeed) {
    console.log("Unable to creeate Feed");
    throw new Error("Unable to create Feed");
  }

  const newFeedFollow = await createFeedFollow(newFeed, user);
  if (!newFeedFollow) {
    console.log("Unable to create Feed Follow");
    throw new Error("Unable to create Feed Follow");
  }

  printFeed(newFeed, user);
}
