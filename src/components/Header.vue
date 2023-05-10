<script setup lang="ts">
const { getThemeTextColor } = useTheme()
const { y } = useWindowScroll()

const color = useColorMode()
const toggleColor = () => {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header
    sticky top-0 h-16 duration-300
    :class="{ 'backdrop-blur-10px backdrop-saturate-180 shadow-header-active-light dark:shadow-header-active-dark': y > 8 }"
  >
    <div h-full flex items-center justify-between px-32>
      <div>
        Logo
      </div>
      <div flex items-center space-x-4>
        <nav flex space-x-4>
          <NuxtLink to="/about">
            About
          </NuxtLink>
          <NuxtLink to="/writings">
            Blog
          </NuxtLink>
          <NuxtLink to="/work">
            Work
          </NuxtLink>
          <NuxtLink to="/contact">
            Contact
          </NuxtLink>
          <NuxtLink to="/test">
            TEST
          </NuxtLink>
        </nav>
        <div h-24px w-1px bg-gray-300 dark:bg-dark-300 />
        <button
          role="switch" type="button"
          relative block h-22px w-10 shrink-0
          border-1 border-gray-400 rounded-11px border-solid
          transition-colors-250
          dark:border-dark-300 hover:border-gray-600 dark:hover:border-dark-100
          @click.prevent="toggleColor()"
        >
          <span
            rounded="1/2" absolute left-1px top-1px h-18px w-18px transition-transform-250
            :style="{ transform: `translateX(${color.preference === 'light' ? 0 : 18}px)` }"
          >
            <span relative block h-18px w-18px overflow-hidden rounded="1/2" bg-gray-100 dark:bg-dark-400>
              <Icon
                name="material-symbols:dark-mode-outline" size="12"
                :class="color.preference === 'light' ? 'opacity-0' : 'opacity-100'"
                absolute left-3px top-3px text-black duration-200 dark:text-white
              />
              <Icon
                name="material-symbols:light-mode-outline" size="12"
                :class="color.preference === 'light' ? 'opacity-100' : 'opacity-0'"
                absolute left-3px top-3px text-black duration-200 dark:text-white
              />
            </span>
          </span>
        </button>
        <div h-24px w-1px bg-gray-300 dark:bg-dark-300 />
        <div flex space-x-4>
          <NuxtLink
            href="https://github.com/ArthurDanjou" target="_blank" text-gray-700 duration-300 dark:text-gray-400
            :class="`hover:${getThemeTextColor}`"
          >
            <Icon name="mdi:github" size="24" />
          </NuxtLink>
          <NuxtLink
            href="https://twitter.com/ArthurDanj" target="_blank" text-gray-700 duration-300 dark:text-gray-400
            :class="`hover:${getThemeTextColor}`"
          >
            <Icon name="mdi:twitter" size="24" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
a.router-link-exact-active {
  color: v-bind(getThemeTextColor)
}
</style>
