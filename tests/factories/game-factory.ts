import { faker } from '@faker-js/faker';
import {gamesRepository} from "../../src/repositories"
import { Game } from '@prisma/client';
import { FinalScoreInput, FinalScore } from 'protocols';

export function gameInput(){
    return {
        awayTeamName: faker.company.catchPhraseNoun(),
        homeTeamName: faker.company.catchPhraseNoun()
    }
}

export function finishGameInput(homeTeamScore?: number, awayTeamScore?:number){
    if(!homeTeamScore)homeTeamScore=faker.number.int({min:0, max:9});
    if(!awayTeamScore)awayTeamScore= faker.number.int({min:0, max:9});
    return {homeTeamScore , awayTeamScore}
}

export async function testFinshedGame(){    
    const game = await gamesRepository.createGame(gameInput())
    const finalScore:FinalScore = {...finishGameInput(), id: game.id}
    const finishedGame = gamesRepository.finishGame(finalScore)
    return finishedGame;
} 

export async function testFinshGame(finalScore?:FinalScoreInput){
    if(!finalScore)finalScore= finishGameInput();
    const game =  await gamesRepository.createGame(gameInput());
    return {game, finalScore}
} 

export async function testGame(){
    return await gamesRepository.createGame(gameInput())
}

export async function createManytestGames(amount?:number){
    const games:Game[] = []

    if(!amount)amount = faker.number.int({min:1, max:10});

    for(let i = 0 ; i < amount ; i++){
        const game = await testGame();
        games.push(game)
    }

    return {games,amount}
}
