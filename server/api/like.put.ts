import {z} from 'zod'

const PostSchema = z.object({ slug: z.string() }).parse

export default defineEventHandler(async (event) => {
	const { slug } = await readValidatedBody(event, PostSchema)
	return useDB().update(tables.posts)
		.set({
			likes: sql`${tables.posts.likes}
      + 1`,
		})
		.where(eq(tables.posts.slug, slug))
})
