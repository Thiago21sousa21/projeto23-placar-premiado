import { gamesRepository, betsRepository } from '../repositories'
import {
NewGame,
FinalScore,
Winner,
Loser,
WinnersAndLosts,
FinalScoreInput,
BetsAndParticipants,
Sums
} from '../protocols';
import errorsList from '../errors/error-list'
import { Bet, Game } from '@prisma/client'

export async function createGame(newGame: NewGame) {
    const result = await gamesRepository.createGame(newGame)
    return result
}

async function updateBetsAndBalances
    (
        array: BetsAndParticipants,
        finalScore: FinalScoreInput,
        sums: Sums
    ) {
    const FEE = 0.3;
    for (let i = 0; i < array.length; i++) {
        const bet = array[i];
        const winned = (
            bet.awayTeamScore === finalScore.awayTeamScore
            &&
            bet.homeTeamScore === finalScore.homeTeamScore
        );
        if (winned) {
            const participant = array[i].participant
            const { amountBet, id } = bet;
            const gain = (amountBet / sums.winBets) * (sums.bets) * (1 - FEE);
            await betsRepository.updateBetsAndBalances(id, participant.id, gain, 'WON')
        } else {
            const participant = array[i].participant
            await betsRepository.updateBetsAndBalances(bet.id, participant.id, 0, 'LOST')
        }
    }
}

export async function finishGame(theChange: FinalScore) {
    const game = await gamesRepository.getGameById(theChange.id)
    if (!game) throw errorsList.notFound('game')
    if (game.isFinished) throw errorsList.toFinishFinishedGame()

    const changedGame = await gamesRepository.finishGame(theChange)

    const allBets = await gamesRepository.GetAllBettersThisGame(theChange)
    const finanlScore:FinalScoreInput = {
        awayTeamScore: theChange.awayTeamScore,
        homeTeamScore: theChange.homeTeamScore
    }
    const sums:Sums = {
        bets:allBets[1]._sum.amountBet,
        winBets:allBets[2]._sum.amountBet
    }
    await updateBetsAndBalances(allBets[0], finanlScore , sums)
    return changedGame
}

export async function getGameWithBet(id: number) {
    const result = await gamesRepository.getGameWithBet(id);
    if (!result) throw errorsList.notFound('game');
    return result
}

export async function getGames() {
    const result = await gamesRepository.getGames()
    return result
}
