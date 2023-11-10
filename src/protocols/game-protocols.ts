import { Game } from "@prisma/client";

export type NewGame = Pick<Game, "awayTeamName" | "homeTeamName">