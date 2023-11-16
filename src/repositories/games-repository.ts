import { Game } from '@prisma/client';
import prisma from '../database'
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
            bet:true
        }
    })
    return result;
}


export async function GetAllBettersThisGame({id, awayTeamScore, homeTeamScore}:Partial<Game>){

    const result = await prisma.$transaction([
        prisma.bet.findMany({
            where:{gameId:id},
            include:{participant:true}
        }),
        prisma.bet.aggregate({
            where:{gameId:id},
            _sum:{amountBet:true}
        }),
        prisma.bet.aggregate({
            where:{
                gameId:id,
                awayTeamScore,
                homeTeamScore
            },
            _sum:{amountBet:true}
        }) 
    ])

    return result;
}



