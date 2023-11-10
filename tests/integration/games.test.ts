import supertest from 'supertest'
import app from '../../src/app'
import httpStatus from 'http-status';
import { clearDb } from '../helpers';
import {NewGame} from '../../src/protocols'
import {gameInput} from '../factories'


const api = supertest(app);

describe('post /games', ()=>{

    beforeAll(async()=>{
        await clearDb()
    })

    describe('should return 201, created', ()=>{

        it('the body is correct', async()=>{

            const newGame:NewGame = gameInput()
            
            const result = await api.post('/games').send(newGame)
            
            expect(result.status).toBe(httpStatus.CREATED)
        })
    })
})