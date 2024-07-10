import { pgSchema, uuid, varchar, text, integer, timestamp, date } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { db } from "./config"

export const schema = pgSchema("app")

db.execute(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`).then(() => {
  console.log("uuid-ossp extension created")
})

export const roles = schema.enum("roles", ["admin", "user"])

export const userTable = schema.table('user', {
  id: uuid("id").primaryKey().$default(()=> sql`uuid_generate_v4()`),
  email: varchar("email", {
    length: 50,
  }).unique().notNull(),
  user_role: roles("user_role").notNull().default("user"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
})

export const charactersTable = schema.table('character', {
  id: uuid("id").primaryKey().$default(()=> sql`uuid_generate_v4()`),
  name: varchar("name", {
    length: 50,
  }).notNull().unique(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
})

export const votesTable = schema.table('votes', {
  id: uuid("id").primaryKey().$default(()=> sql`uuid_generate_v4()`),
  userId: uuid("user_id").notNull().references(()=> userTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  characterId: uuid("character_id").notNull().references(()=> charactersTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  votesValue: integer("votes_value").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
})

export const commentsTable = schema.table('comments', {
  id: uuid("id").primaryKey().$default(()=> sql`uuid_generate_v4()`),
  userId: uuid("user_id").notNull().references(()=> userTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  votesId: uuid("votes_id").notNull().references(()=> votesTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
})

export const clientTable = schema.table('client', {
  id: uuid("id").primaryKey().$default(()=> sql`uuid_generate_v4()`),
  name: varchar("name", {
    length: 50,
  }).notNull(),
  lastName: varchar("last_name", {
    length: 50,
  }).notNull(),
  birthDate: date("birth_date",{
    mode: "string",
  }).notNull(),
  address: text("address").notNull(),
  userId: uuid("user_id").notNull().references(()=> userTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
})

export const adminTable = schema.table('admin', {
  id: uuid("id").primaryKey().$default(()=> sql`uuid_generate_v4()`),
  name: varchar("name", {
    length: 50,
  }).notNull(),
  lastName: varchar("last_name", {
    length: 50,
  }).notNull(),
  birthDate: date("birth_date",{
    mode: "string",
  }).notNull(),
  address: text("address").notNull(),
  userId: uuid("user_id").notNull().references(()=> userTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  phoneNumber: integer("phone_number").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
})

