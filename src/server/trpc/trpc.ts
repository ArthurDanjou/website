import { initTRPC } from '@trpc/server'
import SuperJSON from 'superjson'
import type { Context } from './context'

const trpc = initTRPC.context<Context>().create({
  transformer: SuperJSON,
})

export const publicProcedure = trpc.procedure
export const router = trpc.router
export const middleware = trpc.middleware
export const mergeRouters = trpc.mergeRouters
