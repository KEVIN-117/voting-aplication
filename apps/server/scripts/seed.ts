
import {Pool} from "pg"
import { loadEnvs } from '../src/utils/loadEnvs';
import bcrypt from "bcrypt";
import { charactersData, usersData, votesData } from './placeholder-data';

loadEnvs();
async function seedUser(client: Pool){
  const createTable = await client.query(`
    CREATE TABLE IF NOT EXISTS app.USER (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      email VARCHAR(50) NOT NULL UNIQUE,
      user_role app.role DEFAULT 'USER',
      password VARCHAR(255) NOT NULL CHECK (length(password) > 0)
    );`)

  console.log("User table created");

  const insertData = await Promise.all(
    usersData.map(async (user) => {
      const hashPassword = await bcrypt.hash(user.password, 10)
      await client.query(`
        INSERT INTO app.USER (id, email, user_role, password)
        VALUES ('${user.id}', '${user.email}', '${user.user_role}', '${hashPassword}');`)
    })
  )

  console.log("Data inserted");
  return {
    createTable,
    insertData
  }
}

async function seedCharacter(client: Pool){
  const createTable = await client.query(`
    CREATE TABLE IF NOT EXISTS app.CHARACTER (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE,
      description TEXT
    );
  `)

  console.log("Character table created");
  const insertData = await Promise.all(
    charactersData.map(
      async (character) => {
        await client.query(`
          INSERT INTO app.CHARACTER(id, name, description)
          VALUES ('${character.id}', '${character.name}', '${character.description}')
        `)
      }
    )
  )
  console.log("Data inserted");
  return {
    createTable,
    insertData
  }
}

async function seedVotes(client: Pool){
  const createTable = await client.query(`
    CREATE TABLE IF NOT EXISTS app.VOTES(
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES app.USER(id) ON DELETE CASCADE ON UPDATE CASCADE,
      character_id UUID REFERENCES app.CHARACTER(id) ON DELETE CASCADE ON UPDATE CASCADE,
      vote_value INT NOT NULL CHECK (vote_value >= 0)
    );
  `)

  console.log("Votes table created");
  const insertedData = await Promise.all(
    votesData.map(
      async (vote)=>{
        await client.query(`
          INSERT INTO app.VOTES(id, user_id, character_id, vote_value)
          VALUES ('${vote.id}', '${vote.user_id}', '${vote.character_id}', '${vote.vote_value}')
        `)
      }
    )
  )
  console.log("Data inserted");
  return {
    createTable,
    insertedData
  }
}


async function buildSeed(){
  const client =new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  await client.query(`CREATE SCHEMA IF NOT EXISTS app;`)
  console.log("Schema created");
  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
  console.log("uuid-ossp extension created");
  await client.query(`CREATE TYPE app.role AS ENUM ('USER', 'ADMIN');`)
  console.log("Roles created");
  await seedUser(client);
  await seedCharacter(client);
  await seedVotes(client);
}

buildSeed().then(() => {
  console.log("Seed complete");
  process.exit(0);
}).catch((err) => {
  console.error(err);
  process.exit(1);
})
