import supertest from 'supertest'
import app from '../../src/app'
import httpStatus from 'http-status';
import { clearDb } from '../helpers';
import {NewGame} from '../../src/protocols'
import {gameInput, testFinshGame, createManytestGames, testGame} from '../factories'


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