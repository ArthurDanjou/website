import { PrismaClient } from '@prisma/client'
import type { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'

let prisma: PrismaClient | undefined

export function createContext(_event: H3Event) {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['warn', 'info', 'error'],
    })
  }

  return {
    prisma,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
