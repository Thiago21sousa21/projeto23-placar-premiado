import prisma from 'database'
import {NewGame, FinalScore} from '../protocols'

export async function getGames (){
    const result = await prisma.game.findMany({});
    return result;
}

export async function createGame (newGame:NewGame){
    const result  = await prisma.game.create({data:newGame})
    return result
}

export async function getGameById (id: number){
    const result = await prisma.game.findUnique({where:{id}})
    return result
}

export async function finishGame (theChange: FinalScore){

    const result = await prisma.game.update({
        where:{
            id:theChange.id
        },
        data:{
            awayTeamScore: theChange.awayTeamScore,
            homeTeamScore: theChange.homeTeamScore,
            isFinished: true
        }
    })
    return result
}

export async function getGameWithBet (){
//     - Retorna os dados de um jogo junto com as apostas atreladas a ele.
// - Saída: o objeto do jogo contendo a array de apostas realizadas nele.
    
//     ```tsx
//     {
//     	id: number;
//     	createdAt: string;
//     	updatedAt: string;
//     	homeTeamName: string;
//     	awayTeamName: string;
//     	homeTeamScore: number;
//     	awayTeamScore: number;
//     	isFinished: boolean;
//     	bets: {
//     		id: number;
//     		createdAt: string;
//     		updatedAt: string;
//     		homeTeamScore: number;
//     		awayTeamScore: number;
//     		amountBet: number; // representado em centavos, ou seja, R$ 10,00 -> 1000
//     		gameId: number; 
//     		participantId: number;
//     		status: string; // podendo ser PENDING, WON ou LOST
//     		amountWon: number || null; // nulo quando a aposta ainda está PENDING; number caso a aposta já esteja WON ou LOST, com o valor ganho representado em centavos
//     	}[]
//     }
//     ```
}

export * as gamesRepository from  './games-repository'


