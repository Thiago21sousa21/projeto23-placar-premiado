import { NewBet } from "../protocols";
import {betsRepository} from '../repositories/bets-repository'
import {getParticipantById, getGameById, updateBalanceById} from '../utils'
import errorsList from "../utils/error-list";

export async function creatBet(newBet:NewBet){
    const {participantId, amountBet, gameId} = newBet;

    // - Não pode ser criada uma aposta com valor maior do que o saldo atual do participante.
    const participant = await getParticipantById(participantId)
    if(!participant) throw errorsList.notFound('participant')
    const {balance}=participant;
    if(balance < amountBet)throw errorsList.insufficientBalance()

    // - Não pode ser criada uma aposta em um jogo já finalizado.
    const game = await getGameById(gameId)
    if(!game) throw errorsList.notFound('game')
    if(game.isFinished)throw errorsList.gameAlreadCompleted()

    // - Ao criar uma aposta, o valor da aposta deve ser subtraído imediatamente do saldo do participante.
    const newBalance = await updateBalanceById(participantId, amountBet, balance)
    if(!newBalance)throw errorsList.internal()

    const result = await betsRepository.creatBet(newBet)
    return result
}

export * as betsServices from './bets-services'