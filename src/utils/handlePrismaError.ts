import { Prisma } from "@prisma/client"
import { conflit, notFound } from "./throwError"

type IType = { conflit: string }

export default function handlePrismaError(
  error: Prisma.PrismaClientKnownRequestError,
  messageError: string
) {
  switch (error.code) {
    case "P2002":
      conflit(messageError)
      break

    case "P2003":
      notFound(messageError)
      break

    default:
      break
  }
}
