<script lang="ts" setup>
useHead({
  title: 'My uses — Arthur Danjou',
})
</script>

<template>
  <div class="w-container lg:my-32 my-16">
    <div class="max-w-3xl space-y-8">
      <ContentDoc
        class="my-16 prose leading-6 prose-table:w-full md:prose-table:w-4/5 lg:prose-table:w-3/5 max-w-none
             dark:prose dark:prose-invert dark:leading-6 dark:max-w-none dark:prose-table:w-full dark:md:prose-table:w-3/4 dark:lg:prose-table:w-2/5"
        path="/uses"
      />
    </div>
  </div>
</template>

<style>

</style>
