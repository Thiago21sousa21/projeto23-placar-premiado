import { Request, Response } from 'express'
import {NewParticipant} from './../protocols/participants-protocols'
import httpStatus from 'http-status';
import {participantsServices} from '../services'
import prisma from '../database';

export async function createParticipant (req: Request, res: Response){
    const newParticpant: NewParticipant = req.body;
    const result = await participantsServices.createParticipant(newParticpant)
    res.status(httpStatus.CREATED).send(result)
}

export async function getParticipants (req: Request, res: Response){
    const result = await participantsServices.getParticipants()
     
    res.status(httpStatus.OK).send(result)
}

export *  from './participants-controller';