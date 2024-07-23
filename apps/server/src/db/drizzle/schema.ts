import {uuid, varchar, text, integer, timestamp, date, pgTable, pgEnum, boolean, primaryKey, } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { db } from "./config"

import pg from "pg"
import { drizzle } from "drizzle-orm/postgres-js"
import type { AdapterAccount } from "next-auth/adapters"

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

// next auth schemas

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => sql`uuid_generate_v4()`),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)
