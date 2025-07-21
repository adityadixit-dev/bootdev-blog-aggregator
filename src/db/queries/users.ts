import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";

export type UserSelect = typeof users.$inferSelect;

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUserByName(name: string): Promise<UserSelect> {
  const [result] = await db.select().from(users).where(eq(users.name, name));
  return result;
}

export async function deleteAllUsers() {
  await db.delete(users);
}

export async function getAllUsers() {
  const results = await db.select().from(users);
  return results;
}

export async function getUserById(userId: string): Promise<UserSelect> {
  const [result] = await db.select().from(users).where(eq(users.id, userId));
  return result;
}
