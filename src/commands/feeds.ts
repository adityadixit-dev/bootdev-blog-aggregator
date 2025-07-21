import { checkArgsOrThrow } from ".";
import { getAllFeeds } from "../db/queries/feeds";
import { getUserById, UserSelect } from "../db/queries/users";
import { Feed } from "../db/schema";
import { printFeed } from "../feeds/print-feed";

export async function handlerFeeds(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  checkArgsOrThrow(cmdName, 0, ...args);

  const allFeeds = await getAllFeeds();
  if (!allFeeds) {
    throw new Error("No Feeds Found");
  }

  await Promise.all(allFeeds.map(getUserAndPrintFeed));
}

async function getUserAndPrintFeed(feed: Feed) {
  const userID = feed.userId;
  const user: UserSelect = await getUserById(userID);
  if (!userID || !user) {
    return;
  }
  printFeed(feed, user);
}
