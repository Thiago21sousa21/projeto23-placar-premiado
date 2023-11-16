import { gamesRepository } from '../repositories'
import { betsRepository } from '../repositories'
import { participantsRepository } from '../repositories'
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
import errorsList from '../utils/error-list'
import { Bet, Game } from '@prisma/client'

export async function createGame(newGame: NewGame) {
    const result = await gamesRepository.createGame(newGame)
    return result
}

async function separateWonLost(resultGame: Game, allBets: Bet[]) {
    const FEE = 0.3;
    let sumAllBets = 0;
    let sumWinnerBets = 0;

    const winners: Winner[] = [];
    const losts: Loser[] = [];

    for (let i = 0; i < allBets.length; i++) {
        const amountBet = allBets[i].amountBet;
        sumAllBets += amountBet;

        const awayGuess = allBets[i].awayTeamScore;
        const homeGuess = allBets[i].homeTeamScore;
        const wasTheBetWon = resultGame.awayTeamScore === awayGuess && resultGame.homeTeamScore === homeGuess;
        if (wasTheBetWon) {
            sumWinnerBets += amountBet;
            winners.push({
                id: allBets[i].participantId,
                gain: undefined,
                amountBet,
                betId: allBets[i].id
            })
            await betsRepository.updateStatusBet(allBets[i].id, 'WON')
        } else {
            losts.push({
                id: allBets[i].participantId,
                gain: 0,
                betId: allBets[i].id
            })
            await betsRepository.updateStatusBet(allBets[i].id, 'LOST')
        }
    }

    for (let i = 0; i < winners.length; i++) {
        const gain = (winners[i].amountBet / (sumWinnerBets)) * (sumAllBets) * (1 - FEE);
        winners[i].gain = gain;
    }

    const result: WinnersAndLosts = {
        winners: winners,
        losts: losts
    }
    return result;

}

async function addUpTheValues(separateBettors: WinnersAndLosts) {
    const winners = separateBettors.winners;
    const losts = separateBettors.losts;

    for (let i = 0; i < winners.length; i++) {
        //somar no participant id o valor que ele ganhou
        const participant = winners[i];
        await participantsRepository.incrementBalance(participant)
    }

    for (let i = 0; i < losts.length; i++) {
        const participant = losts[i];
        await participantsRepository.incrementBalance(participant)
    }
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
