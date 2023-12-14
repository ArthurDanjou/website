import { PrismaClient } from '@prisma/client/edge'
import { PrismaClientExtends } from '@prisma/client/scripts/default-index'
import { withAccelerate } from '@prisma/extension-accelerate'

let prisma: any

export function usePrisma() {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['warn', 'info', 'error'],
    }).$extends(withAccelerate())
  }

  return prisma
}
