import { getCustomLog } from './../src/utils/logs/logs'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function seed() {
  const hashedPassword = await hash(process.env.USER_PASSWORD!, 10)

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
        password: hashedPassword,
      },
    })

    // create one budget with associated category and user
    const budget = await prisma.budget.create({
      data: {
        name: 'Orçamento 2021',
        description: 'Orçamento',
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
        name: 'Pilar 1',
        categoryId: category.id,
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

    // habits
    const habit = await prisma.habit.create({
      data: {
        name: 'Correr',
        trigger: 'Deixar o sapato de corrida na porta',
        habitType: 'POSITIVE',
        reward: 'Assistir um episódio de série',
        description: 'Correr 5km',
      },
    })

    await prisma.habitUser.create({
      data: {
        userId: user.id,
        habitId: habit.id,
      },
    })

    // network
    const network = await prisma.network.create({
      data: {
        name: 'Rede de amigos',
        description: 'Rede de amigos e familiares',
        toBenefit: 'Apoio emocional',
        toServe: 'Recursos',
        emails: ['example@email.com', 'example2@email.com'],
        numberContacts: ['(11) 99999-9999', '(11) 99999-9999'],
      },
    })

    await prisma.networkUser.create({
      data: {
        userId: user.id,
        networkId: network.id,
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
