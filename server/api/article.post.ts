import {z} from 'zod'

const PostSchema = z.object({ slug: z.string() }).parse

export default defineEventHandler(async (event) => {
  const { slug } = await readValidatedBody(event, PostSchema)
  return useDB().insert(tables.posts).values({
    slug,
  }).onConflictDoUpdate({
    target: tables.posts.id,
    set: {
      views: sql`${tables.posts.views}
      + 1`,
    },
  })
})
