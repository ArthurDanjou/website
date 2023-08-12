<script lang="ts" setup>
import type { Post } from '../../../types'

const route = useRoute()
const { data: postContent } = await useAsyncData<Post>(`blog:post-content:${route.params.id}`, async () => await queryContent<Post>(`/posts/${route.params.id}`).findOne())
</script>

<template>
  <div>
    {{ postContent }}
  </div>
</template>

<style>

</style>
