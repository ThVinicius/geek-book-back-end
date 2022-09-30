import prisma from '../src/database/db'

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'mangá' },
      { name: 'anime' },
      { name: 'manhua' },
      { name: 'donghua' },
      { name: 'novel' },
      { name: 'série' }
    ],
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
