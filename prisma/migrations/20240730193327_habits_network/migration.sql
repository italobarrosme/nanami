-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('SPOT', 'IN_INSTALLMENTS');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'DEBIT', 'CREDIT', 'PIX', 'OTHER');

-- CreateEnum
CREATE TYPE "HabitType" AS ENUM ('POSITIVE', 'NEGATIVE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habit_users" (
    "habitId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "habit_users_pkey" PRIMARY KEY ("habitId","userId")
);

-- CreateTable
CREATE TABLE "network_users" (
    "networkId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "network_users_pkey" PRIMARY KEY ("networkId","userId")
);

-- CreateTable
CREATE TABLE "budget_users" (
    "budgetId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "budget_users_pkey" PRIMARY KEY ("budgetId","userId")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pillars" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "name" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "pillars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "paymentType" "PaymentType" NOT NULL,
    "installmentNumber" INTEGER NOT NULL DEFAULT 1,
    "totalInstallments" INTEGER NOT NULL DEFAULT 1,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "pillarId" TEXT NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incomes" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "paymentType" "PaymentType" NOT NULL,
    "installmentNumber" INTEGER NOT NULL DEFAULT 1,
    "totalInstallments" INTEGER NOT NULL DEFAULT 1,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "pillarId" TEXT NOT NULL,

    CONSTRAINT "incomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habits" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "reward" TEXT NOT NULL,
    "habitType" "HabitType" NOT NULL,

    CONSTRAINT "habits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "networks" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "networks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "habit_users" ADD CONSTRAINT "habit_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habit_users" ADD CONSTRAINT "habit_users_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "network_users" ADD CONSTRAINT "network_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "network_users" ADD CONSTRAINT "network_users_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "networks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_users" ADD CONSTRAINT "budget_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_users" ADD CONSTRAINT "budget_users_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pillars" ADD CONSTRAINT "pillars_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pillars" ADD CONSTRAINT "pillars_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_pillarId_fkey" FOREIGN KEY ("pillarId") REFERENCES "pillars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_pillarId_fkey" FOREIGN KEY ("pillarId") REFERENCES "pillars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
