
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
    const result = await prisma.participant.findMany({})
    return result
}

export async function getParticipantById(id:number){
    const result = await prisma.participant.findUnique({where:{id}})
    return result
}

export  async function incrementBalance (participant: Winner | Loser){
    const result = await prisma.$transaction([
        prisma.participant.update({
            where:{id: participant.id},
            data:{
                balance:{
                    increment:participant.gain
                }
            }
        }),
        prisma.bet.update({
            where:{
                id:participant.betId
            },
            data:{
                amountWon: participant.gain
            }
        })
    ])
} 

export async function updateBalanceById(idParticipant:number, newBalance:number){
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




