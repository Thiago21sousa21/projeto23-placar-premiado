import prisma from '../database'

export async function getParticipantById(id:number){
    const result = await prisma.participant.findUnique({where:{id}})
    return result
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

