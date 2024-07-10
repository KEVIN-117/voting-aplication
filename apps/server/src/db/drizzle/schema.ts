import {uuid, varchar, text, integer, timestamp, date, pgTable, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { db } from "./config"

db.execute(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`).then(() => {
  console.log("uuid-ossp extension created")
})

export const roles = pgEnum("roles", ["admin", "user"])

export const User = pgTable('users', {
  id: uuid("id").primaryKey().$default(()=> sql`uuid_generate_v4()`),
  email: varchar("email", {
    length: 50,
  }).unique().notNull(),
  userRole: roles("user_role").notNull().default("user"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
})

export const Character = pgTable('character', {
  id: uuid("id").primaryKey().$default(()=> sql`uuid_generate_v4()`),
  name: varchar("name", {
    length: 50,
  }).notNull().unique(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
})

export const Vote = pgTable('votes', {
  id: uuid("id").primaryKey().$default(()=> sql`uuid_generate_v4()`),
  userId: uuid("user_id").notNull().references(()=> User.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  characterId: uuid("character_id").notNull().references(()=> Character.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  votesValue: integer("votes_value").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
})

export const Comment = pgTable('comments', {
  id: uuid("id").primaryKey().$default(()=> sql`uuid_generate_v4()`),
  userId: uuid("user_id").notNull().references(()=> User.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  votesId: uuid("votes_id").notNull().references(()=> Vote.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
})

export const Client = pgTable('client', {
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
  userId: uuid("user_id").notNull().references(()=> User.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
})

export const Admin = pgTable('admin', {
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
  userId: uuid("user_id").notNull().references(()=> User.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  phoneNumber: integer("phone_number").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
})

