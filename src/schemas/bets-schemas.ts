import Joi from "joi";
import {NewBet} from '../protocols'

export const betSchema = Joi.object<NewBet>({
    awayTeamScore: Joi.number().integer().min(0).required(),
    homeTeamScore: Joi.number().integer().min(0).required(),
    gameId: Joi.number().integer().min(1).required(),
    participantId:  Joi.number().integer().min(1).required(),
    amountBet: Joi.number().integer().min(0).required()
})