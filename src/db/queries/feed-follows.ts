import { and, eq } from "drizzle-orm";
import { db } from "..";
import { Feed, feedFollows, feeds, users } from "../schema";
import { UserSelect } from "./users";

export async function removeFeedForUser(feed: Feed, user: UserSelect) {
  const [result] = await db
    .delete(feedFollows)
    .where(
      and(eq(feedFollows.userId, user.id), eq(feedFollows.feedId, feed.id)),
    )
    .returning({ feedFollowsId: feedFollows.id });
  return result;
}

export async function getFeedFollowsForUser(user: UserSelect) {
  const results = await db
    .select({
      feedName: feeds.name,
    })
    .from(feedFollows)
    .where(eq(feedFollows.userId, user.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id));

  if (!results) {
    throw new Error("Unable to get FeedFollows for user");
  }

  return {
    userName: user.name,
    feedsForUser: results.map((result) => result.feedName),
  };
}

export async function createFeedFollow(feed: Feed, user: UserSelect) {
  const [newFeedFollow] = await db
    .insert(feedFollows)
    .values({
      userId: user.id,
      feedId: feed.id,
    })
    .onConflictDoNothing()
    .returning();

  if (!newFeedFollow) {
    throw new Error("Unable to create new feed follow");
  }

  const [result] = await db
    .select({
      feedFollowsId: feedFollows.id,
      feedFollowsCreatedAt: feedFollows.createdAt,
      feedFollowsUpdatedAt: feedFollows.updatedAt,
      userName: users.name,
      feedName: feeds.name,
    })
    .from(feedFollows)
    .where(eq(feedFollows.id, newFeedFollow.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id));

  if (!result) {
    throw new Error("Unable to get FeedFollows");
  }

  return result;
}
