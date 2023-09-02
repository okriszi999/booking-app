import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

console.log("process.env.POSTGRES_URL", process.env.POSTGRES_URL);
console.log("process.env.POSTGRES_URL", process.env.POSTGRES_URL);
export const db = drizzle(sql);
