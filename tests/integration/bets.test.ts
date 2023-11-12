import supertest from 'supertest'
import app from '../../src/app'
import httpStatus from 'http-status';
import { clearDb } from '../helpers';
import {participantsRepository} from '../../src/repositories'
import {gamesRepository} from '../../src/repositories'

import {testParticipant, testGame, testBet} from '../factories'


const api = supertest(app);

describe('post /bets', ()=>{

    beforeEach(async()=>{
        await clearDb()
    })

    describe('should return 201, created', ()=>{

        it('the body is correct', async()=>{

            const bet = await testBet();
           
            const result = await api.post('/bets').send(bet)
            
            expect(result.status).toBe(httpStatus.CREATED)

        })
    })
})