import { Participant, Game } from "@prisma/client";
import { NewBet } from "protocols";
import {faker} from '@faker-js/faker'
import {testParticipant, testGame} from './'


export async function testBet(participant?: Participant, game?:Game){
    if(!participant)participant = await testParticipant();
    if(!game)game = await testGame();

    const result: NewBet ={
        amountBet:faker.number.int({max:participant.balance}),
        gameId:game.id,
        participantId:participant.id,
        awayTeamScore:faker.number.int({max:9}),
        homeTeamScore:faker.number.int({max:9})
    }
    return result
}

