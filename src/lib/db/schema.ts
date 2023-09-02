import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
export const contractors = pgTable("contractors", {
  id: serial("cuid").primaryKey(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  email: varchar("email", {
    length: 256,
  })
    .unique()
    .notNull(),
  phone: varchar("phone", {
    length: 256,
  }),
});
