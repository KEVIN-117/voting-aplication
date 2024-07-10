
import {Pool} from "pg"
import * as dotenv from 'dotenv';
import * as bcrypt from "bcrypt";
import { charactersData, clientData, commentsData, usersData, votesData, adminData } from './placeholder-data';

dotenv.config();
async function seedUser(client: Pool){
  const createTable = await client.query(`
    CREATE TABLE IF NOT EXISTS USERS (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      email VARCHAR(50) NOT NULL UNIQUE,
      user_role role DEFAULT 'VOTER',
      password VARCHAR(255) NOT NULL CHECK (length(password) > 0),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );`)

  console.log("User table created");

  const insertData = await Promise.all(
    usersData.map(async (user) => {
      const hashPassword = await bcrypt.hash(user.password, 10)
      await client.query(`
        INSERT INTO USERS (id, email, user_role, password)
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
    CREATE TABLE IF NOT EXISTS CHARACTER (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE,
      description TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `)

  console.log("Character table created");
  const insertData = await Promise.all(
    charactersData.map(
      async (character) => {
        await client.query(`
          INSERT INTO CHARACTER(id, name, description)
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
    CREATE TABLE IF NOT EXISTS VOTES(
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE,
      character_id UUID REFERENCES CHARACTER(id) ON DELETE CASCADE ON UPDATE CASCADE,
      vote_value INT NOT NULL CHECK (vote_value >= 0),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `)

  console.log("Votes table created");
  const insertedData = await Promise.all(
    votesData.map(
      async (vote)=>{
        await client.query(`
          INSERT INTO VOTES(id, user_id, character_id, vote_value)
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

async function seedComments(client: Pool){
  const createTable = await client.query(`
    CREATE TABLE IF NOT EXISTS COMMENTS(
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE,
      votes_id UUID REFERENCES VOTES(id) ON DELETE CASCADE ON UPDATE CASCADE,
      comment TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `)
  console.log("Comments table created");
  const insertedData = await Promise.all(
    commentsData.map(
      async (comment) => {
        await client.query(`
          INSERT INTO COMMENTS(id, user_id, votes_id, comment)
          VALUES ('${comment.id}', '${comment.user_id}', '${comment.votes_id}', '${comment.comment}')
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


async function seedClients(client: Pool){
  const createTable = await client.query(`
    CREATE TABLE IF NOT EXISTS CLIENT(
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      birth_day DATE NOT NULL,
      address VARCHAR(50) NOT NULL,
      user_id UUID REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `)
  console.log("Client table created");
  const insertedData = await Promise.all(
    clientData.map(
      async (clientData) =>{
        await client.query(`
          INSERT INTO CLIENT(id, name, last_name, birth_day, address, user_id)
          VALUES ('${clientData.id}', '${clientData.name}', '${clientData.last_name}', '${clientData.birth_day}', '${clientData.address}', '${clientData.user_id}')
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

async function seedAdmins(client: Pool){
  const createTable = await client.query(`
    CREATE TABLE IF NOT EXISTS ADMIN(
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      birth_day DATE NOT NULL,
      address VARCHAR(50) NOT NULL,
      user_id UUID REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE,
      phone_number VARCHAR(50) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `)
  console.log("Admin table created");
  const insertedData = await Promise.all(
    adminData.map(
      async (admin) =>{
        await client.query(`
          INSERT INTO ADMIN(id, name, last_name, birth_day, address, user_id, phone_number)
          VALUES ('${admin.id}', '${admin.name}', '${admin.last_name}', '${admin.birth_day}', '${admin.address}', '${admin.user_id}', '${admin.phone_number}')
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
  const client = new Pool({
    connectionString: "postgresql://postgres:postgres@localhost:5432/votes",
  })
  client.on("connect", () => {
    console.log("Connected to database");
  })

  client.on("error", console.error)

  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
  console.log("uuid-ossp extension created");
  await client.query(`CREATE TYPE role AS ENUM ('VOTER', 'ADMIN');`)
  console.log("Roles created");
  await seedUser(client);
  await seedCharacter(client);
  await seedVotes(client);
  await seedComments(client);
  await seedClients(client);
  await seedAdmins(client);
  await client.end();
}

buildSeed().then(() => {
  console.log("Seed complete");
  process.exit(0);
}).catch((err) => {
  console.error(err);
  process.exit(1);
})
