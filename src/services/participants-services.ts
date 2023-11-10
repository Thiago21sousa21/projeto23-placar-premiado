import { participantsRepository } from 'repositories'
import {NewParticipant} from './../protocols/participants-protocols'


export async function createParticipant (newParticpant: NewParticipant){
    const result = await participantsRepository.createParticipant(newParticpant)
    return result
}

export * as participantsServices from './participants-services';