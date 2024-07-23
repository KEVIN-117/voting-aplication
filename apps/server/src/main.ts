/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { ExpressAuth } from "@auth/express"
import Google  from "@auth/express/providers/google"
import Github from "@auth/express/providers/github"
import GitLab from "@auth/express/providers/gitlab"
import Credentials from "@auth/express/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db/drizzle/config"
import { loadEnvs } from './utils/loadEnvs';
import { sql } from 'drizzle-orm';
import morgan from 'morgan';
import { ErrorHandler } from './middleware/error.middleware';
import { characterRouter } from './route/character.route';
import { accounts, authenticators, sessions, users, verificationTokens } from './db/drizzle/schema';

loadEnvs();

const app = express();

app.set("trust proxy", true)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))


app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

app.use('/api', characterRouter)


app.use("/auth/*", ExpressAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators
  }),
  providers: [
    Google, Github, GitLab,
    Credentials({
      credentials: {
        email: {
          id: "email",
          name: "email",
          label: "email",
          placeholder: "email",
          type: "email",
        },
        password: {
          id: "password",
          name: "password",
          label: "password",
          placeholder: "password",
          type: "text",
        },
        role: {
          id: "role",
          name: "role",
          label: "role",
          placeholder: "role",
          type: "text",
        }
      },
      authorize: async (credentials)=>{
        let user = null;

      }
    })
  ]
}))

app.use(ErrorHandler)
const port = process.env.PORT || 3333;
const server = app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}/api`);
  const result = await db.execute(sql`select now() as ts`);
  //const users = await db.select().from(User)
  console.log(result.rows[0]);
});
server.on('error', console.error);
