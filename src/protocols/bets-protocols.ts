import { Bet, Participant } from "@prisma/client"


export type Winner ={
    id: number,
    gain: number,
    amountBet: number,
    betId: number
}

export type Loser ={
    id: number,
    gain: number,
    betId: number
}

export type WinnersAndLosts = {
    winners: Winner[],
    losts: Loser[]
}

export type NewBet = Pick<Bet, "amountBet" | "gameId" | "participantId" | "awayTeamScore" | "homeTeamScore">

export type BetsAndParticipants = (Bet & {participant:Participant})[]
export type Sums = { bets: number, winBets:number}