import { faker } from '@faker-js/faker';
import {gamesRepository} from "../../src/repositories"
import { Game } from '@prisma/client';

export function gameInput(){
    return {
        awayTeamName: faker.company.catchPhraseNoun(),
        homeTeamName: faker.company.catchPhraseNoun()
    }
}

export function finishGameInput(){
    return {
        homeTeamScore: faker.number.int({min:0, max:9}),
        awayTeamScore: faker.number.int({min:0, max:9})
    }
}

export async function testFinshGame(){
    return {
        game: await gamesRepository.createGame(gameInput()),
        finalScore: finishGameInput()
    }
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
