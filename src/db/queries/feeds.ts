import { db } from "..";
import { feeds, type Feed } from "../schema";
import { UserSelect } from "./users";

export async function createFeed(
  name: string,
  feedUrl: string,
  user: UserSelect,
) {
  const [result] = await db
    .insert(feeds)
    .values({
      name: name,
      url: feedUrl,
      userId: user.id,
    })
    .returning();
  return result;
}

export async function getAllFeeds() {
  const results = await db.select().from(feeds);
  return results;
}
