import { prismaClient } from '../../prisma/prisma'

async function main() {
  const result = await prismaClient.transaction.findMany({
    where: {
      description: {
        contains: "2"
      }
    }
  })

  console.log(JSON.stringify(result, null, 2))
}

main()
  .catch(console.error)
  .finally(async () => {
    await prismaClient.$disconnect()
  })
