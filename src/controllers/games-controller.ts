import { Request, Response } from 'express'
import httpStatus from 'http-status';
import {NewGame} from '../protocols'
import {gameServices} from '../services/games-services'

export async function createGame (req: Request, res: Response){
    const newGame:NewGame  = req.body;
    const result = await gameServices.createGame(newGame)
    res.status(httpStatus.CREATED).send(result)
}