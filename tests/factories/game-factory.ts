import { faker } from '@faker-js/faker';

export function gameInput(){
    return {
        awayTeamName: faker.company.catchPhraseNoun(),
        homeTeamName: faker.company.catchPhraseNoun()
    }
}