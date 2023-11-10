import { Request, Response } from 'express'
import {NewParticipant} from './../protocols/participants-protocols'
import httpStatus from 'http-status';
import {participantsServices} from '../services/participants-services'

export async function createParticipant (req: Request, res: Response){
    const newParticpant: NewParticipant = req.body;
    const result = await participantsServices.createParticipant(newParticpant)
    res.status(httpStatus.CREATED).send(result)
}

export *  from './participants-controller';