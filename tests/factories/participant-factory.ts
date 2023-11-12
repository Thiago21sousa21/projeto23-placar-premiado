import { faker } from '@faker-js/faker';
import {participantsRepository} from "../../src/repositories"

export function participantInput (){
    return {
        name: faker.person.firstName(),
        balance: faker.number.int({ min: 1000, max: 99999 })
    }
}

export async function testParticipant(){
    return await participantsRepository.createParticipant(participantInput())
} 

