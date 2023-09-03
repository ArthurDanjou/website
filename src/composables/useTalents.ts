import { useTalentsStore } from '~/store/talents'

export async function useTalents() {
  const { $trpc } = useNuxtApp()
  const { setCategory, setFavorite, getCategory, isFavorite } = useTalentsStore()

  const {
    data: talents,
    refresh: refreshTalents,
  } = await useAsyncData('talents:talents', async () => await $trpc.talents.getTalents.query({ favorite: isFavorite.value, category: getCategory.value }))

  async function switchCategory(category: string) {
    setCategory(category)
    await refreshTalents()
  }

  async function toggleFavorite() {
    setFavorite()
    await refreshTalents()
  }

  const {
    data: getCategories,
  } = await $trpc.talents.getCategories.useQuery()

  return {
    talents,
    getCategories,
    isFavorite,
    switchCategory,
    toggleFavorite,
  }
}
