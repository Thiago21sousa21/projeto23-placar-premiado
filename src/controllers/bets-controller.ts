import { Request, Response } from 'express'
import httpStatus from 'http-status';
import {NewBet} from '../protocols'
import {betsServices} from '../services/bets-services'

export async function createBet (req: Request, res: Response){
    const newBet: NewBet = req.body;
    const result = await betsServices.creatBet(newBet)
    res.status(httpStatus.CREATED).send(result)
}
