import supertest from 'supertest'
import app from '../../src/app'
import httpStatus from 'http-status';
import { clearDb } from '../helpers';


const api = supertest(app);

describe("participants integration route", ()=>{

    beforeEach(async()=>{
        await clearDb()
    })

    it('should return 201', async()=>{
        const {status, body} = await api.post('/participants' ).send({name: "thiago", balance:20})
        expect(status).toBe(httpStatus.CREATED);
        //expect(body).toBe('I am ok')
    })
})