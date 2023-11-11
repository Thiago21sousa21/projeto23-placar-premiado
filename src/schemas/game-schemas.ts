import Joi from "joi";
import { NewGame, FinalScoreInput } from '../protocols'

export const gameSchema = Joi.object<NewGame>({
    awayTeamName: Joi.string().required(),
    homeTeamName: Joi.string().required()
})

export const finalScoreSchema = Joi.object<FinalScoreInput>({
    awayTeamScore: Joi.number().integer().min(0).required(),
    homeTeamScore: Joi.number().integer().min(0).required()
})

export const paramsIdSchema = Joi.object({
    id: Joi.string()
        .trim()
        .regex(/^\d+$/)
        .min(1)
        .required(),
})