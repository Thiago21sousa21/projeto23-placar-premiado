import supertest from 'supertest'
import app from '../../src/app'
import httpStatus from 'http-status';
import { clearDb } from '../helpers';
import {participantsRepository} from '../../src/repositories'
import {gamesRepository} from '../../src/repositories'

import {participantInput, gameInput, testBet} from '../factories'


const api = supertest(app);

describe('post /bets', ()=>{

    beforeAll(async()=>{
        await clearDb()
    })

    describe('should return 201, created', ()=>{

        it('the body is correct', async()=>{

            //requisição assincrona de criar um participante
            const testParticipant = await participantsRepository.createParticipant(participantInput())

            //outra de criar um jogo
            const testGame = await gamesRepository.createGame(gameInput())

            //outra de criar uma aposta usando as informações dos primeiros
            const bet = testBet(testParticipant, testGame)
           
            const result = await api.post('/bets').send(bet)
            
            expect(result.status).toBe(httpStatus.CREATED)
        })
    })
})