import { getCustomLog } from './../src/utils/logs/logs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clean() {
  try {
    // Deletar registros de tabelas com dependências de chave estrangeira primeiro
    await prisma.expense.deleteMany({})
    await prisma.income.deleteMany({})
    await prisma.pillar.deleteMany({})
    await prisma.budgetUser.deleteMany({})
    await prisma.budget.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.category.deleteMany({})

    getCustomLog({
      log: 'Database cleaned successfully',
      type: 'success',
    })
  } catch (error) {
    getCustomLog({
      log: `Failed to clean database: ${error}`,
      type: 'error',
    })
  } finally {
    getCustomLog({
      log: 'Disconnecting from database',
    })
    await prisma.$disconnect()
  }
}

clean().catch((error) => {
  getCustomLog({
    log: `Failed to clean database: ${error.message}`,
    type: 'error',
  })
})
