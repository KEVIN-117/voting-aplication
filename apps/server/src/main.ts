/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { db } from "./db/drizzle/config"
import { loadEnvs } from './utils/loadEnvs';
import { sql } from 'drizzle-orm';


loadEnvs();

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/assets/index.html'));
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}/api`);
  const result = await db.execute(sql`select now() as ts`);
  console.log(result.rows[0]);
});
server.on('error', console.error);
