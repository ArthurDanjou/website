import type { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
import { prisma } from '~/server/prisma'

export function createContext(_event: H3Event) {
  return {
    prisma,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
