import { faker } from '@faker-js/faker';
import {participantsRepository} from "../../src/repositories"
import { NewParticipant } from '../../src/protocols';

export function participantInput (name?:string, balance?: number){
    if(!name)name = faker.person.firstName();
    if(!balance)balance = faker.number.int({ min: 1000, max: 99999 });
    const result:NewParticipant = {name, balance}
    return result;
}

export async function testParticipant(participant?:NewParticipant){
    if(!participant)participant = participantInput();
    return await participantsRepository.createParticipant(participant)
} 

