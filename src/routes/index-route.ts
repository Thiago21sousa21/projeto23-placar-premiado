import { Router } from "express";
import healthRouter from "./health-route"
import gamesRouter from "./games-route"
import participantsRouter from "./participants-route"
import betsRouter from "./bets-route"

const indexRoute = Router();

indexRoute.use(
    healthRouter, 
    betsRouter, 
    participantsRouter, 
    gamesRouter
)

export default indexRoute;