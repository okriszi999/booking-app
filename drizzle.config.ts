import type { Config } from "drizzle-kit";
import { config } from "dotenv";

config();

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL as string,
  },
} satisfies Config;
