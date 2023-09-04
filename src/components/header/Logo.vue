<script lang="ts" setup>
const appConfig = useAppConfig()
const getColor = computed(() => `text-${appConfig.ui.primary}-500`)
</script>

<template>
  <UButton
    class="flex items-center"
    variant="ghost"
    to="/"
    :class="getColor"
  >
    ArthurDanj
  </UButton>
</template>
