import { Router } from "express";
import healthRouter from "./health-route"
import gamesRouter from "./games-route"
import participantsRouter from "./participants-route"
import betsRouter from "./bets-route"

const indexRoute = Router();

indexRoute
    .use('/health',healthRouter)
    .use('/participants',participantsRouter)
    .use('/games',gamesRouter) 
    .use('/bets',betsRouter)

export default indexRoute;