import { XMLParser } from "fast-xml-parser";
import { RSSFeed, RSSItem } from "./feed-types";

export async function fetchFeed(feedUrl: string) {
  const response = await fetch(feedUrl, {
    method: "GET",
    headers: {
      "User-Agent": "gator",
    },
  });

  const data = await response.text();
  // console.log(data);

  const parser = new XMLParser();
  let parsedData = parser.parse(data)?.rss; // parsedData should be a JS object

  // console.log(parsedData);

  if (!parsedData.channel) {
    throw new Error("Parsed Data does not have Channel");
  }

  const feedChannel = parsedData.channel;

  if (!feedChannel.title || !feedChannel.link || !feedChannel.description) {
    throw new Error("Parsed data missing title, link or channel fields");
  }

  const { title, link, description } = feedChannel;

  const item: RSSItem[] = [];

  if (feedChannel.item && Array.isArray(feedChannel.item)) {
    feedChannel.item.map((i: RSSItem) => {
      if (i.title && i.link && i.description && i.pubDate) {
        item.push(i);
      }
    });
  }

  const assembledFeed: RSSFeed = {
    channel: {
      title,
      link,
      description,
      item,
    },
  };

  return assembledFeed;
}
