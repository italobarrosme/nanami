import { getCustomLog } from './../src/utils/logs/logs'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function seed() {
  try {
    // create category
    const category = await prisma.category.create({
      data: {
        name: 'Casa',
        description: 'Custos relacionados a casa e moradia',
      },
    })

    // create user
    const user = await prisma.user.create({
      data: {
        email: 'user@example.com',
        name: 'User',
        password: process.env.USER_PASSWORD,
      },
    })

    // create one budget with associated category and user
    const budget = await prisma.budget.create({
      data: {
        categoryId: category.id,
      },
    })

    await prisma.budgetUser.create({
      data: {
        userId: user.id,
        budgetId: budget.id,
      },
    })

    // create one pillar
    const pillar = await prisma.pillar.create({
      data: {
        name: 'Pilar Moradia',
        budgetId: budget.id,
      },
    })

    // incomes
    await prisma.income.create({
      data: {
        source: 'Salário',
        paymentType: 'SPOT',
        paymentMethod: 'PIX',
        amount: 3000,
        pillarId: pillar.id,
      },
    })

    // expenses
    await prisma.expense.create({
      data: {
        source: 'Aluguel',
        paymentType: 'SPOT',
        paymentMethod: 'PIX',
        amount: 1000,
        pillarId: pillar.id,
      },
    })

    getCustomLog({
      log: 'Seed completed successfully',
      type: 'success',
    })
  } catch (error) {
    getCustomLog({
      log: `Seed failed: ${error}`,
      type: 'error',
    })
  } finally {
    getCustomLog({
      log: 'Disconnecting from database',
    })
    await prisma.$disconnect()
  }
}

seed().catch((error) => {
  getCustomLog({
    log: `Seed failed: ${error.message}`,
    type: 'error',
  })
})
