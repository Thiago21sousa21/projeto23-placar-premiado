import prisma from 'database'
import {NewGame, FinalScore} from '../protocols'

export async function getGames (){
    const result = await prisma.game.findMany({});
    return result;
}

export async function createGame (newGame:NewGame){
    const result  = await prisma.game.create({data:newGame})
    return result
}

export async function getGameById (id: number){
    const result = await prisma.game.findUnique({where:{id}})
    return result
}

export async function finishGame (theChange: FinalScore){

    const result = await prisma.game.update({
        where:{
            id:theChange.id
        },
        data:{
            awayTeamScore: theChange.awayTeamScore,
            homeTeamScore: theChange.homeTeamScore,
            isFinished: true
        }
    })
    return result
}

export async function getGameWithBet (id:number){


    const result = await prisma.game.findUnique({
        where:{
            id
        },
        include:{
            bet:{
                where:{
                    gameId:id
                }
            }
        }
    })
    return result;
}

export * as gamesRepository from  './games-repository'


