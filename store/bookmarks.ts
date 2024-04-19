import {defineStore} from 'pinia'

export const useBookmarksStore = defineStore(
  'bookmarks',
  () => {
    const currentCategory = ref<string>('all')
    const currentFavorite = ref<boolean>(false)

    const getCategory = computed(() => currentCategory)
    function setCategory(newCategory: string) {
      currentCategory.value = newCategory
    }

    const isFavorite = computed(() => currentFavorite)
    function toggleFavorite() {
      currentFavorite.value = !currentFavorite.value
    }

    return {
      getCategory,
      setCategory,
      isFavorite,
      toggleFavorite,
    }
  },
  {
    persist: true,
  },
)
