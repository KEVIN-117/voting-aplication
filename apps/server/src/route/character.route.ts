import { Router } from "express"
import { SchemaValidator } from "../middleware/schemaValidator.middleware"
import { CharacterCreateSchema, CharacterDeleteSchema, CharacterGetSchema, CharacterUpdateSchema, CharacterFilterSchema } from "../schemas/character.schema"
import { characterController } from "../controller/character.controller"

const router = Router()

router.post("/character", SchemaValidator(CharacterCreateSchema), characterController.createCharacter)
router.put("/character/:id", SchemaValidator(CharacterUpdateSchema), characterController.updateCharacter)
router.delete("/character/:id", SchemaValidator(CharacterDeleteSchema), characterController.deleteCharacter)
router.get("/character", characterController.getCharacters)
router.get("/character/:id", SchemaValidator(CharacterGetSchema), characterController.getCharacter)
router.get("/character/filter/data", SchemaValidator(CharacterFilterSchema), characterController.getCharacterByFilter)

export const characterRouter = router
