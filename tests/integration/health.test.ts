import supertest from 'supertest'
import app from '../../src/app'
import httpStatus from 'http-status';
import { clearDb } from '../helpers';


const api = supertest(app);

describe("health route", ()=>{

    beforeEach(async()=>{
        await clearDb()
    })
    it('should return 200', async()=>{
        const {status, text} = await api.get('/health')
        expect(status).toBe(httpStatus.OK);
        expect(text).toBe('I am ok')
    })
})
