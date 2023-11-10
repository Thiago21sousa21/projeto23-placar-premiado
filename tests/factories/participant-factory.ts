import { faker } from '@faker-js/faker';

export function participantInput (){
    return {
        name: faker.person.firstName(),
        balance: faker.number.int({ min: 1000, max: 99999 })
    }
}
