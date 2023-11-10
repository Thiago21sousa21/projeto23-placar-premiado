import { Bet } from "@prisma/client"


export type NewBet = Pick<Bet, "amountBet" | "gameId" | "participantId" | "awayTeamScore" | "homeTeamScore">