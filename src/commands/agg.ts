import { checkArgsOrThrow } from ".";
import { RSSFeed } from "../feeds/feed-types";
import { fetchFeed } from "../feeds/fetch-feed";

export async function handlerAgg(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  // TODO: It should later be such that the function takes in a few arguemnts
  checkArgsOrThrow(cmdName, 0, ...args);

  const feedUrl: string = "https://www.wagslane.dev/index.xml";
  // const feedUrl: string = args[0]

  const feed: RSSFeed = await fetchFeed(feedUrl);

  console.log(`Title: ${feed.channel.title}`);
  console.log(`Link: ${feed.channel.link}`);
  console.log(`Description: ${feed.channel.description}`);
  feed.channel.item.map((i) => {
    console.log(i.title);
    console.log(i.link);
    console.log(i.pubDate);
    console.log(i.description);
  });
}
