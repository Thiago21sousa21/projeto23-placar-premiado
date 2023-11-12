import { Participant, Game } from "@prisma/client";
import { FinalScoreInput, NewBet } from "../../src/protocols";
import {faker} from '@faker-js/faker'
import {testParticipant, testGame} from './'


export async function testBet(participant?: Participant, game?:Game, score?:FinalScoreInput){
    if(!participant)participant = await testParticipant();
    if(!game)game = await testGame();

    if(!score){
        score = {awayTeamScore:undefined, homeTeamScore:undefined}
        score.homeTeamScore=faker.number.int({max:9});
        score.awayTeamScore=faker.number.int({max:9});
    }
    if(!score.homeTeamScore)score.homeTeamScore=faker.number.int({max:9});
    if(!score.awayTeamScore)score.awayTeamScore=faker.number.int({max:9});

    const result: NewBet ={
        amountBet:faker.number.int({max:participant.balance}),
        gameId:game.id,
        participantId:participant.id,
        ...score
    }
    return result
}

