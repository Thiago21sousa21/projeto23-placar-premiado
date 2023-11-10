import { Participant, Game } from "@prisma/client";
import { NewBet } from "protocols";
import {faker} from '@faker-js/faker'


export function testBet(participant: Participant, game:Game){
    const result: NewBet ={
        amountBet:faker.number.int({max:participant.balance}),
        gameId:game.id,
        participantId:participant.id,
        awayTeamScore:faker.number.int({max:9}),
        homeTeamScore:faker.number.int({max:9})
    }
    return result
}