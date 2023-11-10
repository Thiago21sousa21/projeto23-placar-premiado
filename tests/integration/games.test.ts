import supertest from 'supertest'
import app from '../../src/app'
import httpStatus from 'http-status';
import { clearDb } from '../helpers';
import { faker } from '@faker-js/faker';
import {NewGame} from '../../src/protocols'


const api = supertest(app);

describe('post /games', ()=>{

    beforeAll(async()=>{
        await clearDb()
    })

    describe('should return 201, created', ()=>{

        it('the body is correct', async()=>{

            const newGame:NewGame = {
                awayTeamName: faker.company.catchPhraseNoun(),
                homeTeamName: faker.company.catchPhraseNoun()
            }
            const result = await api.post('/games').send(newGame)
            
            expect(result.status).toBe(httpStatus.CREATED)
        })
    })
})