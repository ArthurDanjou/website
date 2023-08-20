<script lang="ts" setup>
import type { Post } from '~~/types'

const route = useRoute()
const { data: postContent } = await useAsyncData<Post>(`writing:${route.params.slug}`, async () => await queryContent<Post>(`/writing/${route.params.slug}`).findOne())

if (!postContent.value) {
  throw createError({
    statusMessage: 'The post you are looking for was not found.',
    statusCode: 404,
  })
}

const { post, view, like, likes, views } = await usePost(route.params.slug.toString())
view()

useHead({
  title: `${postContent.value?.title} • Arthur Danjou's shelf`,
})

function top() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

const { copy, copied } = useClipboard({
  source: `https://arthurdanjou.fr/writing/${route.params.slug}`,
  copiedDuring: 4000,
})

const likeCookie = useCookie<boolean>(`post:like:${postContent.value.slug}`, {
  maxAge: 604_800,
})

const isLiked = computed(() => {
  return likeCookie.value === true
})

async function handleLike() {
  await like()
  likeCookie.value = true
}
</script>

<template>
  <section v-if="postContent && post" class="w-container lg:mt-24 mt-16">
    <div class="lg:relative">
      <div class="max-w-3xl space-y-8 mx-auto">
        <div class="mx-auto max-w-2xl">
          <UButton
            icon="i-ph-arrow-circle-left-bold"
            variant="soft"
            size="lg"
            :ui="{ rounded: 'rounded-full' }"
            class="lg:absolute left-0 mb-8"
            @click.prevent="useRouter().back()"
          />
          <article>
            <header class="flex flex-col space-y-6">
              <time class="flex items-center text-base text-zinc-400 dark:text-zinc-500">
                <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <div class="ml-3 flex gap-3">
                  <div>
                    {{ postContent.publishedAt }}
                  </div>
                  <span>•</span>
                  <div>{{ postContent.readingMins }} min</div>
                  <span>•</span>
                  <div>{{ views }} {{ views > 1 ? 'views' : 'view' }}</div>
                </div>
              </time>
              <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {{ postContent.title }}
              </h1>
              <p class="text-subtitle">
                {{ postContent.description }}
              </p>
            </header>
            <div class="w-full rounded-md my-8">
              {{ postContent.cover }}
            </div>
            <ClientOnly>
              <ContentRenderer
                class="mt-12 prose leading-6 prose-table:w-full md:prose-table:w-3/4 lg:prose-table:w-2/5 max-w-none
                 dark:prose dark:prose-invert dark:leading-6 dark:max-w-none dark:prose-table:w-full dark:md:prose-table:w-3/4 dark:lg:prose-table:w-2/5"
                :value="postContent"
              />
              <template #fallback>
                <p class="my-16 text-subtitle">
                  The content of the page is loading...
                </p>
              </template>
            </ClientOnly>
            <footer class="my-8 space-y-8">
              <p class="text-subtitle">
                Thanks for reading this post! If you liked it, please consider sharing it with your friends. <strong>Don't forget to leave a like!</strong>
              </p>
              {{ likeCookie }}
              <div class="flex gap-4 flex-wrap">
                <UButton
                  v-if="isLiked"
                  :label="`${likes} ${likes > 1 ? 'likes' : 'like'}`"
                  icon="i-ph-heart-bold"
                  size="lg"
                  variant="solid"
                />
                <UButton
                  v-else
                  :label="`${likes} ${likes > 1 ? 'likes' : 'like'}`"
                  icon="i-ph-heart-bold"
                  size="lg"
                  variant="soft"
                  @click.prevent="handleLike()"
                />
                <UButton
                  label="Go to top"
                  icon="i-ph-arrow-up-bold"
                  size="lg"
                  variant="soft"
                  @click.prevent="top()"
                />
                <UButton
                  label="Share on Twitter"
                  icon="i-ph-twitter-logo-bold"
                  size="lg"
                  variant="soft"
                  @click.prevent="copy()"
                />
                <UButton
                  v-if="copied"
                  label="Link copied"
                  icon="i-lucide-clipboard-check"
                  color="green"
                  size="lg"
                  variant="soft"
                  @click.prevent="copy()"
                />
                <UButton
                  v-else
                  label="Copy link"
                  icon="i-lucide-clipboard"
                  size="lg"
                  variant="soft"
                  @click.prevent="copy()"
                />
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
