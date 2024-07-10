/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { db } from "./db/drizzle/config"
import { loadEnvs } from './utils/loadEnvs';
import { sql } from 'drizzle-orm';
import morgan from 'morgan';
import { ErrorHandler } from './middleware/error.middleware';
import { characterRouter } from './route/character.route';

loadEnvs();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))


app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

app.use('/api', characterRouter)

app.use(ErrorHandler)
const port = process.env.PORT || 3333;
const server = app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}/api`);
  const result = await db.execute(sql`select now() as ts`);
  //const users = await db.select().from(User)
  console.log(result.rows[0]);
});
server.on('error', console.error);
