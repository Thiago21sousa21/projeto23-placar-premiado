import prisma from "../src/database"

export const clearDb = async() => {
    await prisma.bet.deleteMany({})
    await prisma.participant.deleteMany({})
    await prisma.game.deleteMany({})
}