import { Router } from "express";
import {createBet} from '../controllers/bets-controller'
import { validateBody } from "middlewares/validation-inputs";
import {betSchema} from '../schemas'


const betsRouter = Router()

betsRouter
    .post('/',validateBody(betSchema) ,createBet)

export default betsRouter;