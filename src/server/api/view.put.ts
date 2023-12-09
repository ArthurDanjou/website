import { z } from 'zod'

const PostSchema = z.object({ slug: z.string() }).parse

export default defineEventHandler(async (event) => {
  const { slug } = await readValidatedBody(event, PostSchema)
  return await usePrisma().post.update({
    where: {
      slug,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  })
})
