import prisma from  '../database'


export async function getGameById (id: number){
    const result = await  prisma.game.findUnique({where:{id}})
    return result;
}