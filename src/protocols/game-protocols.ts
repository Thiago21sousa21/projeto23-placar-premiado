import { Game } from "@prisma/client";

export type NewGame = Pick<Game, "awayTeamName" | "homeTeamName">
export type FinalScoreInput = Pick<Game, "awayTeamScore" | "homeTeamScore">
export type FinalScore = Pick<Game,"id" | "awayTeamScore" | "homeTeamScore">
export type ParamsGameType = {id: string}

