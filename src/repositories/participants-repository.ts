
import { Loser, Winner } from "protocols";
import prisma from "../database";
import { NewParticipant } from "protocols/participants-protocols";

// export async function FindActivityByDayId(DayId: number) {
//   return await prisma.activity.findMany({
//     where: {
//       Days: {
//         some: {
//           id: DayId,
//         },
//       },
//     },
//     include: { Users: { select: { id: true } } },
//   });
// }

export async function getParticipants () {
//   - Retorna todos os participantes e seus respectivos saldos.
// - Saída: array de todos os participantes.
    
//     ```tsx
//     [
//     	{
//     		id: number;
//     		createdAt: string;
//     		updatedAt: string;
//     		name: string;
//     		balance: number; // representado em centavos, ou seja, R$ 10,00 -> 1000
//     	}, 
//     	{...}
//     ]
//     ```
}

export async function getParticipantById(id:number){
    const result = await prisma.participant.findUnique({where:{id}})
    return result
}

export  async function incrementBalance (participant: Winner | Loser){
    const result = await prisma.participant.update({
        where:{id: participant.id},
        data:{
            balance:{
                increment:participant.gain
            }
        }
    })
} 

export async function updateBalanceById(idParticipant:number, balance:number, amountBet: number){
    const newBalance = balance - amountBet;
    const result = await prisma.participant.update({
        where:{id:idParticipant},
        data:{
            balance: newBalance
        }
    })
    return result.balance
}

export async function createParticipant (newParticpant:NewParticipant){
    const result = await prisma.participant.create({data:newParticpant})
    return result
}

export * as participantsRepository from './participants-repository'



