import type { Config } from "@planetscale/database";

export const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
} satisfies Config;
