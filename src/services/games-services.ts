import {gamesRepository} from '../repositories'
import {betsRepository} from '../repositories'
import {participantsRepository} from '../repositories'

import {NewGame, FinalScore, Winner, Loser, WinnersAndLosts} from '../protocols'
import errorsList from '../utils/error-list'
import { Bet, Game } from '@prisma/client'

export async function createGame (newGame:NewGame){
    const result  = await gamesRepository.createGame(newGame)
    return result
}

async function separateWonLost(resultGame: Game, allBets: Bet[]){
    const  FEE = 0.3;
    let sumAllBets = 0;
    let sumWinnerBets = 0;

    const winners:Winner[] = [];
    const losts:Loser[] = [];

    for(let i =0 ; i<allBets.length; i++){
        const amountBet = allBets[i].amountBet;
        sumAllBets+=amountBet;

        const awayGuess = allBets[i].awayTeamScore;
        const homeGuess = allBets[i].homeTeamScore;
        const wasTheBetWon =resultGame.awayTeamScore === awayGuess && resultGame.homeTeamScore === homeGuess;
        if(wasTheBetWon){
            sumWinnerBets+=amountBet;
            winners.push({
                id: allBets[i].participantId,
                gain: undefined,
                amountBet,
                betId:allBets[i].id
            })
            await betsRepository.updateStatusBet(allBets[i].id, 'WON')
        } else{
            losts.push({
                id: allBets[i].participantId,
                gain: 0,
                betId:allBets[i].id
            })
            await betsRepository.updateStatusBet(allBets[i].id, 'LOST')
        }
    }

    for(let i =0 ; i < winners.length; i++){
        const gain = (winners[i].amountBet / (sumWinnerBets)) * (sumAllBets) * (1-FEE);
        winners[i].gain=gain;
    }

    const result:WinnersAndLosts = {
        winners: winners,
        losts: losts
    }
    return result;

}

async function addUpTheValues(separateBettors:WinnersAndLosts){
    const winners = separateBettors.winners;
    const losts = separateBettors.losts;

    for(let i = 0; i < winners.length ; i++){
        //somar no participant id o valor que ele ganhou
        const participant = winners[i];
        await participantsRepository.incrementBalance(participant)
    }
    
    for(let i = 0; i < losts.length ; i++){
        const participant = losts[i];
        await participantsRepository.incrementBalance(participant)
    }
}

export async function finishGame (theChange:FinalScore ){
    
    //verificar se o jogo realmente existe
    const game = await gamesRepository.getGameById(theChange.id)
    if(!game)throw errorsList.notFound('game')

    //verifica se já esta finalizado
    if(game.isFinished) throw errorsList.toFinishFinishedGame()

    //altera o placar e finaliza
    const changedGame  = await gamesRepository.finishGame(theChange)
    
    //pegar todas as apostas que envolvem esse jogo
    const  allBets = await betsRepository.getBetAllBetsOfOneId(theChange.id)

    //separar os que ganharam e atualizar o status da aposta
    const separateBettors = await separateWonLost(changedGame, allBets)

    //somar os valore ganhos
    await addUpTheValues(separateBettors)

    return changedGame
}

export async function getGameWithBet (id:number){
    const result  = await gamesRepository.getGameWithBet(id);
    if(!result)throw errorsList.notFound('game');
    return result
}

export async function getGames (){
    const result  = await gamesRepository.getGames()
    return result
}
