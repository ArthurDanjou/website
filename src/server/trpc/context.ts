import type { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient | undefined

export function createContext(_event: H3Event) {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  }

  return {
    prisma,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
