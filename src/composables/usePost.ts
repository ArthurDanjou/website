export async function usePost(slug: string) {
  const { $trpc } = useNuxtApp()

  const {
    data: post,
    refresh: refreshPost,
  } = await useAsyncData(`blog:post-db:${slug}`, async () => await $trpc.post.createOrUpdate.mutate({
    slug,
  }))

  const likes = ref(post.value!.likes)
  const like = async () => {
    const data = await $trpc.post.like.mutate({ slug })
    likes.value = data.likes
  }

  const views = ref(post.value!.views)
  const view = async () => {
    const data = await $trpc.post.view.mutate({ slug })
    views.value = data.views
  }

  return {
    post,
    like,
    view,
    refreshPost,
    likes: computed(() => likes.value),
    views: computed(() => views.value),
  }
}
