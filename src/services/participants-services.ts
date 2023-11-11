import { participantsRepository } from '../repositories/participants-repository'
import {NewParticipant} from './../protocols/participants-protocols'


export async function createParticipant (newParticpant: NewParticipant){
    const result = await participantsRepository.createParticipant(newParticpant)
    return result
}

export async function getParticipants (){
    const result = await participantsRepository.getParticipants()
    return result
}


export * as participantsServices from './participants-services';