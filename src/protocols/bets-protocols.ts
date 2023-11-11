import { Bet } from "@prisma/client"


export type Winner ={
    id: number,
    gain: number,
    amountBet: number
}

export type Loser ={
    id: number,
    gain: number
}

export type WinnersAndLosts = {
    winners: Winner[],
    losts: Loser[]
}

export type NewBet = Pick<Bet, "amountBet" | "gameId" | "participantId" | "awayTeamScore" | "homeTeamScore">