import { Router } from "express";
import {createBet} from '../controllers/bets-controller'


const betsRouter = Router()

betsRouter
    .post('/', createBet)

export default betsRouter;