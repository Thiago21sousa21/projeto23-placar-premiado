import prisma from "database";
import { NewBet } from "protocols";

export async function creatBet (newBet:NewBet){
    const result = await prisma.bet.create({data:newBet})
    return result
}

export * as betsRepository from './bets-repository'