<template>
  <section class="w-container lg:my-24 my-16">
    <div class="max-w-2xl space-y-8">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl !leading-tight">
        Software I use, Hardware I own, and my favorite stack
      </h1>
      <p class="leading-relaxed text-subtitle">
        I get often asked what I use to create software, to play games or to work and learn. Here's a big list of all my favourite things.
      </p>
      <ClientOnly>
        <ContentDoc
          class="my-16"
          path="/uses"
        />
        <template #fallback>
          <USkeleton class="w-full h-1/2" />
        </template>
      </ClientOnly>
    </div>
  </section>
</template>
