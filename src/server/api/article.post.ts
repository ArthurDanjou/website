import { z } from 'zod'

const PostSchema = z.object({ slug: z.string() }).parse

export default defineEventHandler(async (event) => {
  const { slug } = await readValidatedBody(event, PostSchema)
  return await usePrisma().post.upsert({
    where: {
      slug,
    },
    update: {
      views: {
        increment: 1,
      },
    },
    create: {
      slug,
    },
  })
})
