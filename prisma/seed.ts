import prisma from "../src/database/db"

async function main() {
  await prisma.category.createMany({
    data: [
      { name: "Mangá" },
      { name: "Anime" },
      { name: "Novel" },
      { name: "Série" }
    ],
    skipDuplicates: true
  })

  await prisma.status.createMany({
    data: [{ name: "Ativo" }, { name: "Completo" }],
    skipDuplicates: true
  })
}

main()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
