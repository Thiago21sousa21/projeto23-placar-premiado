import {gamesRepository} from '../repositories/games-repository'
import {NewGame} from '../protocols'

export async function createGame (newGame:NewGame){
    const result  = await gamesRepository.createGame(newGame)
    return result
}

export * as gameServices from './games-services'