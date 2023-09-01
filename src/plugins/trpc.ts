import process from 'node:process'
import { loggerLink } from '@trpc/client'
import SuperJSON from 'superjson'
import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import type { AppRouter } from '~/server/trpc/routers'

export default defineNuxtPlugin(() => {
  const trpc = createTRPCNuxtClient<AppRouter>({
    transformer: SuperJSON,
    links: [
      loggerLink({
        enabled: opts =>
          process.env.NODE_ENV === 'development'
          || (opts.direction === 'down' && opts.result instanceof Error),
      }),
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  })

  return {
    provide: {
      trpc,
    },
  }
})
