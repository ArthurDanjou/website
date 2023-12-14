import { PrismaClient } from '@prisma/client/edge'

let prisma: PrismaClient | undefined

export function usePrisma() {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['warn', 'info', 'error'],
    })
  }

  return prisma
}
