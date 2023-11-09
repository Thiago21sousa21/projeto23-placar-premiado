import supertest from 'supertest'
import app from '../../src/app'
import httpStatus from 'http-status';
import prisma from '../../src/database';
import { faker } from '@faker-js/faker';


const api = supertest(app);

describe("health route", ()=>{

    beforeEach(async()=>{
        await prisma.participant.deleteMany({})
        await prisma.game.deleteMany({})
        await prisma.bet.deleteMany({})
    })

    it('should return 200', async()=>{
        const {status, text} = await api.get('/health')
        expect(status).toBe(httpStatus.OK);
        expect(text).toBe('I am ok')
    })
})
