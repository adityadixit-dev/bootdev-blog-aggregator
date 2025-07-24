import { UserSelect } from "../db/queries/users";
import { type Feed } from "../db/schema";

export function printFeed(feed: Feed, user: UserSelect) {
  for (const [key, val] of Object.entries(feed)) {
    console.log(`Feed ${key} = ${val}`);
  }

  for (const [key, val] of Object.entries(user)) {
    console.log(`User ${key} = ${val}`);
  }
}
