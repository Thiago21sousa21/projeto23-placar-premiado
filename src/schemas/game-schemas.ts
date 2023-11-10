import Joi from "joi";
import {NewGame} from '../protocols'

export const gameSchema = Joi.object<NewGame>({
    awayTeamName: Joi.string().required(),
    homeTeamName: Joi.string().required()
})