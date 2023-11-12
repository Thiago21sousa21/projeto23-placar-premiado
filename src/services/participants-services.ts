import { participantsRepository } from '../repositories'
import {NewParticipant} from '../protocols'


export async function createParticipant (newParticpant: NewParticipant){
    const result = await participantsRepository.createParticipant(newParticpant)
    return result
}

export async function getParticipants (){
    const result = await participantsRepository.getParticipants()
    return result
}

