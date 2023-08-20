export async function useTalents() {
  const { $trpc } = useNuxtApp()

  const getTalents = async (category: string, favorite: boolean) => await $trpc.talents.getTalents.query({ favorite, category })

  const {
    data: getCategories,
  } = await $trpc.talents.getCategories.useQuery()

  function getCategoryById(id: number) {
    return getCategories.value?.find(category => category.id === id)?.name || 'Not Found'
  }

  return {
    getTalents,
    getCategories,
    getCategoryById,
  }
}
