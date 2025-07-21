import { defineConfig } from "drizzle-kit";
import { readConfig } from "./src/config";

export default defineConfig({
  schema: "src/db/schema.ts",
  out: "src/db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: readConfig().dbUrl,
  },
});
