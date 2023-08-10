<script lang="ts" setup>
const isOpen = ref(false)
</script>

<template>
  <div class="md:hidden">
    <div class="p-1 rounded-md bg-black/5 text-sm font-medium text-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-300">
      <UButton
        variant="ghost"
        color="primary"
        size="sm"
        icon="i-ph-list-bold"
        @click="isOpen = true"
      />
    </div>

    <USlideover v-model="isOpen">
      <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div>
            Header
          </div>
        </template>

        Content

        <template #footer>
          Footer
        </template>
      </UCard>
    </USlideover>
  </div>
</template>

<style>

</style>
