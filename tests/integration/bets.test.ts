import supertest from 'supertest'
import app from '../../src/app'
import httpStatus from 'http-status';
import { clearDb } from '../helpers';
import 
    {
        testParticipant, 
        testGame, 
        testBet, 
        testFinshedGame
    } 
from '../factories'
import { number } from 'joi';


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

            expect(result.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    amountBet: expect.any(Number),
                    gameId: expect.any(Number),
                    participantId: expect.any(Number),
                    awayTeamScore: expect.any(Number),
                    homeTeamScore: expect.any(Number),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                })
            )
        })
    })

    describe('should return 404', ()=>{

        it('participant not Found', async()=>{

            const lastParticipant = await testParticipant();
            lastParticipant.id += 100;

            const bet = await testBet(lastParticipant);
           
            const result = await api.post('/bets').send(bet)
            
            expect(result.status).toBe(httpStatus.NOT_FOUND)

        })

        it('game not Found', async()=>{

            const lastGame = await testGame()
            lastGame.id+= 100;

            const bet = await testBet(undefined, lastGame);
           
            const result = await api.post('/bets').send(bet)
            
            expect(result.status).toBe(httpStatus.NOT_FOUND)

        })
    })

    describe('should return 409, conflict', ()=>{

        it("It shouldn't be possible to bet on a finished game", async()=>{
            const finishedGame = await testFinshedGame()
            const bet = await testBet(undefined, finishedGame);
           
            const result = await api.post('/bets').send(bet)
            
            expect(result.status).toBe(httpStatus.CONFLICT)

        })
    })

    describe('should return 402, conflict', ()=>{

        it("It shouldn't be possible to place a bet greater than your own balance", async()=>{
            const participant = await testParticipant()
            const bet = await testBet(participant);
            
            bet.amountBet=participant.balance +1;
           
            const result = await api.post('/bets').send(bet)
            
            expect(result.status).toBe(httpStatus.PAYMENT_REQUIRED)

        })
    })
})