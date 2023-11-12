import supertest from 'supertest'
import app from '../../src/app'
import httpStatus from 'http-status';
import { clearDb } from '../helpers';
import {NewGame} from '../../src/protocols';
import 
    {
        gameInput, 
        testFinshGame, 
        createManytestGames, 
        testGame,
        testFinshedGame,
        finishGameInput,
        testParticipant,
        participantInput,
        testBet
    } 
from '../factories';


const api = supertest(app);

beforeEach(async()=>{
    await clearDb()
})

describe('post /games', ()=>{   

    describe('should return 201, created', ()=>{

        it('the body is correct', async()=>{

            const newGame:NewGame = gameInput()
            
            const result = await api.post('/games').send(newGame)
            
            expect(result.status).toBe(httpStatus.CREATED)
        })
    })
})

describe('post /games/:id/finish', ()=>{

    describe('should return 200', ()=>{

        it('the game should be finished', async()=>{

            const game = await testFinshGame()

            const result = await api.post(`/games/${game.game.id}/finish`).send(game.finalScore)
            
            expect(result.status).toBe(httpStatus.OK)
        })

        it('the game should be finished and balances updates', async()=>{
            const participant1 = await testParticipant(participantInput(undefined, 1000))
            const participant2 = await testParticipant(participantInput(undefined, 1000))
            const participant3 = await testParticipant(participantInput(undefined, 1000))

            const game = await testFinshGame(finishGameInput(1, 1))

            const bet1 = await testBet(participant1, game.game, finishGameInput(1,1));
            const bet2 = await testBet(participant2, game.game, finishGameInput(0,0));
            const bet3 = await testBet(participant3, game.game, finishGameInput(0,0));

            await api.post(`/games/${game.game.id}/finish`).send(game.finalScore)

            const result = await api.get(`/games/${game.game.id}`)
            
            expect(result.status).toBe(httpStatus.OK)
        })
    })

    describe('should return 404', ()=>{

        it('game not found', async()=>{

            const game = await testFinshGame()
            game.game.id += 100;

            const result = await api.post(`/games/${game.game.id}/finish`).send(game.finalScore)
            
            expect(result.status).toBe(httpStatus.NOT_FOUND)
        })
    })

    describe('should return 409', ()=>{

        it('its no possible to finish a finished game', async()=>{
            const finishedGame = await testFinshedGame()

            const result = await api.post(`/games/${finishedGame.id}/finish`).send(finishGameInput())

            expect(result.status).toBe(httpStatus.CONFLICT);
        })
    })
})

describe('get /games', ()=>{

    describe('should return 200', ()=>{

        it('should return some games', async()=>{

            const manyGames = await createManytestGames();

            const result = await api.get(`/games`)
            
            expect(result.status).toBe(httpStatus.OK)
            expect(result.body).toHaveLength(manyGames.amount)
        })
    })
})

describe('get games/:id', ()=>{

    describe('should return 200', ()=>{

        it('should return one game', async()=>{

            const game = await testGame();
            const {id, awayTeamName, homeTeamName, awayTeamScore, homeTeamScore, isFinished} = game;

            const result = await api.get(`/games/${game.id}`)
            expect(result.status).toBe(httpStatus.OK)            
            expect(result.body).toEqual(expect.objectContaining(
                    {
                        id,
                        awayTeamName,
                        homeTeamName,
                        awayTeamScore,
                        homeTeamScore,
                        isFinished,
                        bet: expect.any(Array),
                        updatedAt: expect.any(String),
                        createdAt: expect.any(String)
                    }
                )
            )
            
        })
    })

})