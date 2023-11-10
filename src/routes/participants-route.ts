import { Router, Request } from "express";
import {createParticipant} from '../controllers/participants-controller'
import { validateBody } from "middlewares/validation-inputs";
import {participantSchema} from "../schemas/participants-schemas"


const participantsRouter = Router()

participantsRouter
    .post('/', validateBody(participantSchema), createParticipant)

export default participantsRouter;