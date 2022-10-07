import prisma from "../database/db"

function createLink(userId: number, shortUrl: string) {
  return prisma.share.upsert({
    create: { userId, shortUrl },
    update: {},
    where: { userId }
  })
}

function get(shortUrl: string) {
  return prisma.share.findUnique({ where: { shortUrl } })
}

export default { createLink, get }
