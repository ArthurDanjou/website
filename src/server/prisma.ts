import process from 'node:process'
import { PrismaClient } from '@prisma/client/edge'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma
 || new PrismaClient({
   log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
 })

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prisma
