import { Request, Response } from 'express'
import httpStatus from 'http-status';
import {NewGame, ParamsGameType, FinalScore, FinalScoreInput} from '../protocols'
import {gameServices} from '../services/games-services'

export async function createGame (req: Request, res: Response){
    const newGame:NewGame  = req.body;
    const result = await gameServices.createGame(newGame)
    res.status(httpStatus.CREATED).send(result)
}

export async function finishGame (req: Request, res: Response){
    const theChangeInput:FinalScoreInput  = req.body;
    let theParams = req.params as ParamsGameType;    
    const theChange:FinalScore = {...theChangeInput , id:Number(theParams.id)}
    const result = await gameServices.finishGame(theChange)
    res.status(httpStatus.OK).send(result)
}

export async function getGames (req: Request, res: Response){
    const result = await gameServices.getGames()
    res.status(httpStatus.OK).send(result)
}

