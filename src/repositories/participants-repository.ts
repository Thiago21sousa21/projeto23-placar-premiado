
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

export async function createParticipant (newParticpant:NewParticipant){
    const result = await prisma.participant.create({data:newParticpant})
    return result
}

export * as participantsRepository from './participants-repository'



