import prisma from "../src/database"


export const clearDb = async() => {
    await prisma.participant.deleteMany({})
    await prisma.game.deleteMany({})
    await prisma.bet.deleteMany({})
}