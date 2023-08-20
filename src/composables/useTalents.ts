export async function useTalents() {
  const { $trpc } = useNuxtApp()

  const getTalents = async (category: string, favorite: boolean) => await $trpc.talents.getTalents.query({ favorite, category })

  const {
    data: getCategories,
  } = await $trpc.talents.getCategories.useQuery()

  return {
    getTalents,
    getCategories,
  }
}
