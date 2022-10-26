import prisma from "../database/db"
import { Prisma } from "@prisma/client"
import { IUser } from "../types/userTypes"
import handlePrismaError from "../utils/handlePrismaError"

async function insert(data: IUser) {
  try {
    await prisma.user.create({ data })
  } catch (error) {
    const e = error as Prisma.PrismaClientKnownRequestError

    const [uniqueField] = e.meta!.target as string[]

    const messageError = `O ${uniqueField} já está em uso!\nTente outro valor`

    handlePrismaError(e, messageError)
  }
}

async function getByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } })
}

export default { insert, getByEmail }
