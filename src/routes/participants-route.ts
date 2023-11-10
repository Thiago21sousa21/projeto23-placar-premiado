import { Router, Request } from "express";
import {participantsControllers} from '../controllers/participants-controller'
import { validateBody } from "middlewares/validation-inputs";
import {participantSchema} from "../schemas/participants-schemas"


const participantsRouter = Router()

participantsRouter.post('/',validateBody(participantSchema) ,participantsControllers.createParticipant)

export default participantsRouter;