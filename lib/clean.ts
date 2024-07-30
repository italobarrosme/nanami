import { getCustomLog } from './../src/utils/logs/logs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clean() {
  try {
    // Delete all data from the database
    await prisma.expense.deleteMany({})
    await prisma.income.deleteMany({})
    await prisma.pillar.deleteMany({})
    await prisma.budgetUser.deleteMany({})
    await prisma.budget.deleteMany({})
    await prisma.category.deleteMany({})
    await prisma.habitUser.deleteMany({})
    await prisma.habit.deleteMany({})
    await prisma.networkUser.deleteMany({})
    await prisma.network.deleteMany({})
    await prisma.user.deleteMany({})

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
