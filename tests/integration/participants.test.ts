import supertest from 'supertest'
import app from '../../src/app'
import httpStatus from 'http-status';
import { clearDb } from '../helpers';
import { NewParticipant } from 'protocols/participants-protocols';
import { faker } from '@faker-js/faker';
import {participantInput} from '../factories'


const api = supertest(app);


describe("post /participants integration route", () => {

    beforeEach(async () => {
        await clearDb()
    })

    it('should return 201', async () => {
        
        const newParticipant:NewParticipant = participantInput() ;

        const { status, body } = await api.post('/participants').send(newParticipant)
        expect(status).toBe(httpStatus.CREATED);
        expect(body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: newParticipant.name,
            balance: newParticipant.balance,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        }))
    })

    describe('should return 422', () => {

        it('the balance must be greater than R$10.00', async () => {
            const newParticipant = {
                name: faker.person.firstName(),
                balance: faker.number.int({ max: 999 })
            }

            const result = await api.post('/participants').send(newParticipant)
            expect(result.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        })

        it('the name and balance fields must be filled in', async () => {
            const newParticipant = {
                name: faker.person.firstName()
            }

            const result = await api.post('/participants').send(newParticipant)
            expect(result.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        })
    })

})