import { Router } from "express";
import {createGame} from '../controllers/games-controller'

const gamesRouter = Router()

gamesRouter
    .post('/', createGame)

export default gamesRouter;