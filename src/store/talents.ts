import { defineStore } from 'pinia'

export const useTalentsStore = defineStore(
  'talents', 
  () => {
    const currentCategory = ref<string>('all')
    const currentFavorite = ref<boolean>(false)

    const getCategory = computed(() => currentCategory)
    const isFavorite = computed(() => currentFavorite)

    function setCategory(category: string) {
      currentCategory.value = category
    }

    function setFavorite() {
      currentFavorite.value = !currentFavorite.value
    }

    return {
      getCategory,
      setCategory,
      setFavorite,
      isFavorite,
    }
  },
  {
    persist: true,
  }
)
