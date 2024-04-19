<script setup lang="ts">
const appConfig = useAppConfig()
const getColor = computed(() => `text-${appConfig.ui.primary}-500`)

useHead({
  title: 'My Shelf • Arthur Danjou'
})

const { data: posts } = await getPosts()
const format = (date: string) => useDateFormat(date, 'D MMMM YYYY').value.replaceAll('"', '')
</script>

<template>
  <section class="w-container lg:my-24 my-16">
    <div class="px-4 max-w-3xl space-y-8">
      <div>
        <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl !leading-tight">
          Writing on my life, development and my passions.
        </h1>
        <p class="leading-relaxed text-subtitle">
          All my thoughts on programming, mathematics, artificial intelligence design, etc., are put together in chronological order. I also write about my projects, my discoveries, and my thoughts. <s>It is sometimes updated.</s>
        </p>
      </div>
    </div>
    <div class="mt-16 md:mt-20">
      <div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div class="flex max-w-3xl flex-col space-y-16">
          <article
            v-for="post in posts"
            :key="post.slug"
            class="px-6 md:grid md:grid-cols-4 md:items-baseline"
          >
            <div class="group md:col-span-3 group relative flex flex-col items-start">
              <h2 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                <div class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 md:rounded-2xl" />
                <NuxtLink :to="post._path">
                  <span class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                  <span class="relative z-10">
                    {{ post.title }}
                  </span>
                </NuxtLink>
              </h2>
              <time class="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
                <span class="absolute inset-y-0 left-0 flex items-center">
                  <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                </span>
                {{ format(post.publishedAt) }}
              </time>
              <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {{ post.description }}
              </p>
              <div
                :class="getColor"
                class="relative z-10 mt-4 flex items-center gap-2 justify-center text-sm font-medium"
              >
                <p>Read article</p>
                <UIcon name="i-ph-arrow-circle-right-bold" />
              </div>
            </div>
            <time class="mt-1 md:block relative z-10 order-first mb-3 hidden text-sm text-zinc-400 dark:text-zinc-500">
              <p>{{ format(post.publishedAt) }}</p>
              <p>{{ post.readingMins }} min.</p>
            </time>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
