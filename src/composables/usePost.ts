export async function usePost(slug: string) {
  const {
    data: post,
    refresh: refreshPost,
  } = useFetch('/api/article', {
    method: 'POST',
    body: {
      slug,
    },
  })

  const likes = ref(post.value?.likes)
  const like = async () => {
    const { data } = await useFetch('/api/like', { method: 'PUT' })
    likes.value = data
  }

  const views = ref(post.value!.views)
  const view = async () => {
    const { data } = await useFetch('/api/view', { method: 'PUT' })
    likes.value = data
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
