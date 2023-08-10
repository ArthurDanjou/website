<script setup lang="ts">
const isOpen = ref(false)
const commandPaletteRef = ref()

const router = useRouter()
const color = useColorMode()

const quickLinks = [
  { id: 'twitter', label: 'Twitter', icon: 'i-ph-twitter-logo-bold' },
  { id: 'github', label: 'GitHub', icon: 'i-ph-github-logo-bold' },
]

const navigations = [
  { id: 'home', label: 'Home', icon: 'i-ph-house-bold', to: '/', shortcuts: ['H'] },
  { id: 'about', label: 'About', icon: 'i-ph-user-bold', to: '/about', shortcuts: ['A'] },
  { id: 'blog', label: 'Blog', icon: 'i-ph-book-bold', to: '/blog', shortcuts: ['B'] },
  { id: 'work', label: 'Work', icon: 'i-ph-wrench-bold', to: '/work', shortcuts: ['W'] },
]

const toast = useToast()

const isDark = computed(() => color.preference === 'dark')
const controls = [
  {
    id: 'color',
    label: 'Toggle Color Mode',
    icon: isDark ? 'i-ph-moon-bold' : 'i-ph-sun-bold',
    click: () => {
      color.preference = color.value === 'dark' ? 'light' : 'dark'
      toast.add({
        color: 'primary',
        title: 'Color mode switched!',
        icon: isDark.value ? 'i-ph-moon-bold' : 'i-ph-sun-bold',
      })
    },
    shortcuts: ['C'],
  },
]

const groups = [{
  key: 'navigation',
  label: 'Navigation',
  inactive: 'Navigation',
  commands: navigations,
}, {
  key: 'quickLinks',
  label: 'Quick Links',
  inactive: 'Quick Links',
  commands: quickLinks,
}, {
  key: 'controls',
  label: 'Controls',
  inactive: 'Controls',
  commands: controls,
}]

const { usingInput } = useShortcuts()
const canToggleModal = computed(() => isOpen.value || !usingInput.value)

defineShortcuts({
  meta_k: {
    usingInput: true,
    whenever: [canToggleModal],
    handler: () => {
      isOpen.value = !isOpen.value
    },
  },
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => { isOpen.value = false },
  },
})

function onSelect(option: any) {
  if (option.click) {
    option.click()
    isOpen.value = false
  }

  else if (option.to) { router.push(option.to) }

  else if (option.href) { window.open(option.href, '_blank') }
}

onKeyStroke(true, (event: KeyboardEvent) => {
  if (!isOpen.value && !usingInput.value) {
    switch (event.key) {
      case 'A':
      case 'a':
        router.push('/about')
        break
      case 'H':
      case 'h':
        router.push('/')
        break
      case 'W':
      case 'w':
        router.push('/work')
        break
      case 'B':
      case 'b':
        router.push('/blog')
        break
      case 'C':
      case 'c':
        color.preference = color.value === 'dark' ? 'light' : 'dark'
        toast.add({
          color: 'primary',
          title: 'Color mode switched!',
          icon: isDark.value ? 'i-ph-moon-bold' : 'i-ph-sun-bold',
        })
        break
    }
  }
})
</script>

<template>
  <UModal v-model="isOpen">
    <UCommandPalette
      ref="commandPaletteRef"
      :groups="groups"
      icon=""
      :autoselect="false"
      placeholder="Search for apps and commands"
      @update:model-value="onSelect"
    />
  </UModal>
</template>
