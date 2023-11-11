import { Router } from "express";
import {createGame, finishGame} from '../controllers/games-controller'
import { validateBody, validateParams } from "middlewares/validation-inputs";
import {gameSchema, finalScoreSchema, paramsIdSchema} from '../schemas'

const gamesRouter = Router()

gamesRouter
    .post('/',validateBody(gameSchema) ,createGame)
    .post('/:id/finish',validateBody(finalScoreSchema), validateParams(paramsIdSchema), finishGame)

export default gamesRouter;