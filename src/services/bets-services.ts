import { NewBet } from "../protocols";
import {betsRepository} from '../repositories/bets-repository'

export async function creatBet(newBet:NewBet){
    const result = await betsRepository.creatBet(newBet)
    return result
}

export * as betsServices from './bets-services'