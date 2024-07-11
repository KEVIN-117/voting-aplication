import { CharacterService } from '../services/character.service';
import { db } from '../db/drizzle/config';
import { CharacterDto } from '../utils/types';
import { Request, Response, NextFunction } from 'express';


const characterService: CharacterService = new CharacterService(db);

const createCharacter = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const data: CharacterDto = req.body;
      await characterService.create(data);
      const result = await characterService.findByName(data.name);
      return res.status(201).json({
        message: 'Character created successfully',
        data: result
      });
  }catch (e){
    next(e)
  }
}


const updateCharacter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data: CharacterDto = req.body;
    const result = await characterService.update(data, id);
    return res.status(200).json(result);
  }catch (e){
    next(e)
  }
}

const deleteCharacter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await characterService.delete(id);
    return res.status(200).json(result);
  }catch (e){
    next(e)
  }
}

const getCharacters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await characterService.findAll();
    console.log(result);
    return res.status(200).json(result);
  }catch (e){
    next(e)
  }
}

const getCharacter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await characterService.findOne(id);
    return res.status(200).json(result);
  }catch (e){
    next(e)
  }
}

const getCharacterByFilter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {query} = req.query;
    const result = await characterService.findBy(query as string);
    return res.status(200).json(result);
  }catch (e){
    next(e)
  }
}

export const characterController = {
  createCharacter,
  updateCharacter,
  deleteCharacter,
  getCharacters,
  getCharacter,
  getCharacterByFilter
}
