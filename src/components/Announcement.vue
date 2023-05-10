<script setup lang="ts">
const { $trpc } = useNuxtApp()
const announcement = await $trpc.announcement.announcement.query()
</script>

<template>
  <div v-if="announcement" flex justify-center>
    <div dark:hover:bg="dark-800/50" hover:bg="gray-100/50" shadow-announcement-light dark:shadow-announcement-dark rounded-md p-4 duration-300 dark:bg-dark-900>
      <p v-html="announcement.content" />
    </div>
  </div>
</template>
