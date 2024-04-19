import {z} from 'zod'

const PostSchema = z.object({ slug: z.string() }).parse

export default defineEventHandler(async (event) => {
  const { slug } = await readValidatedBody(event, PostSchema)
  return useDB().update(tables.posts)
    .set({
      views: sql`${tables.posts.views}
      + 1`,
    })
    .where(eq(tables.posts.slug, slug))
})
