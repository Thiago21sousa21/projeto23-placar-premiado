import { Router } from "express";
import {createGame, finishGame, getGames, getGameWithBet} from '../controllers/games-controller'
import { validateBody, validateParams } from "../middlewares/validation-inputs";
import {gameSchema, finalScoreSchema, paramsIdSchema} from '../schemas'

const gamesRouter = Router()

gamesRouter
    .post('/',validateBody(gameSchema) ,createGame)
    .get('/', getGames)
    .get('/:id', getGameWithBet)
    .post('/:id/finish',validateBody(finalScoreSchema), finishGame)

export default gamesRouter;
//, validateParams(paramsIdSchema)