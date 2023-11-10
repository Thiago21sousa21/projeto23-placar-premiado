import Joi from "joi";
import {NewParticipant} from '../protocols'

export const participantSchema = Joi.object<NewParticipant>({
    name: Joi.string().required(),
    balance: Joi.number().min(1000).required()
})