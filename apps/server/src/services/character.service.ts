import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CharacterDto, Operations } from '../utils/types';
import { Character } from '../db/drizzle/schema';
import { eq, ilike } from 'drizzle-orm/sql/expressions/conditions';

export class CharacterService implements Operations<CharacterDto>{
  private client: NodePgDatabase;
  constructor(client: NodePgDatabase) {
    this.client = client;
  }

  async create(data: CharacterDto): Promise<CharacterDto> {
    try {
      const result = await this.client.insert(Character).values(data)
      return result.rows[0];
    }catch (e) {
      console.error(e);
      throw new Error(`Error creating character: ${e.message}`)
    }
  }

  async update(data: CharacterDto, id: string): Promise<CharacterDto> {
    try {
      const result = await this.client.update(Character).set(data).where(eq(Character.id, id))
      return result.rows[0];
    }catch (e) {
      console.error(e);
      throw new Error(`Error updating character: ${e.message}`)
    }
  }

  async delete(id: string): Promise<CharacterDto> {
    try {
      const result = await this.client.delete(Character).where(eq(Character.id, id))
      return result.rows[0];
    }catch (e) {
      console.error(e);
      throw new Error(`Error deleting character: ${e.message}`)
    }
  }

  async findAll(): Promise<CharacterDto[]> {
    try {
      const result = await this.client.select().from(Character).execute();
      return result;
    }catch (e) {
      console.error(e);
      throw new Error(`Error fetching characters: ${e.message}`)
    }
  }

  async findOne(id: string): Promise<CharacterDto> {
    try {
      const result = await this.client.select().from(Character).where(eq(Character.id, id))
      return result[0];
    }catch (e) {
      console.error(e);
      throw new Error(`Error fetching character: ${e.message}`)
    }
  }

  async findBy(filter: string): Promise<CharacterDto[]> {
    try {
      console.log(filter);
      const result = await this.client.select().from(Character).where(ilike(Character.description, `%${filter}%`));
      return result;
    }catch (e){
      console.error(e);
      throw new Error(`Error fetching character: ${e.message}`)
    }
  }

  async findByName(name: string): Promise<CharacterDto>{
    try {
      const result = await this.client.select().from(Character).where(eq(Character.name, name))
      return result[0];
    }catch (e){
      console.error(e);
      throw new Error(`Error fetching character: ${e.message}`)
    }
  }
}
