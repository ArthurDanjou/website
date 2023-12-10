<script lang="ts" setup>
import type { GuestbookMessage } from '@prisma/client'
import { providers } from '~~/types'

useHead({
  title: 'Sign my guestbook • Arthur Danjou',
})

const { loggedIn, clear } = useUserSession()

const { data: messages, refresh } = useFetch<Array<GuestbookMessage>>('/api/messages', { method: 'get' })

const toast = useToast()
const messageContent = ref<string>('')
async function sign() {
  if (messageContent.value.length < 7 || messageContent.value.length > 58)
    return

  await $fetch('/api/message', {
    method: 'post',
    body: {
      message: messageContent.value,
    },
  }).then(async () => {
    toast.add({
      title: `Thank's for leaving a message!`,
      description: 'Your can see it at the top of the messages.',
      icon: 'i-material-symbols-check-circle-outline-rounded',
      timeout: 4000,
    })
    await refresh()
  }).catch(() => {
    toast.add({
      title: 'An error occured when signing the book!',
      color: 'red',
    })
  })
  messageContent.value = ''
}
</script>

<template>
  <section class="w-container lg:my-24 my-16">
    <div class="max-w-2xl space-y-8 mb-16">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl !leading-tight">
        You want to leave a message ?
      </h1>
      <p class="leading-relaxed text-subtitle">
        Your opinion means a lot to me. Feel free to share your impressions of my projects, explore my site, or simply leave a personalised message. Your comments are a source of inspiration and continuous improvement. Thank you for taking the time to contribute to this virtual community. I look forward to reading what you have to share!
      </p>
    </div>
    <div class="my-12 flex flex-col rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <div class="flex flex-col mb-4">
        <div class="flex items-center gap-2">
          <UIcon name="i-ph-circle-wavy-question-bold" class="text-subtitle text-xl" />
          <h1 class="text-lg font-bold">
            Want to sign my book ?
          </h1>
        </div>
        <p class="font-sm text-subtitle">
          Enter your message just below to sign the book.
        </p>
      </div>
      <div v-if="loggedIn" class="flex items-center justify-between gap-4">
        <div class="w-full relative flex items-center">
          <input
            v-model="messageContent"
            type="text"
            required
            min="7"
            max="58"
            class="w-full rounded-lg p-2 h-10 focus:outline-none bg-gray-100 dark:bg-gray-800"
            placeholder="Leave a message"
          >
          <UButton
            class="absolute right-1 top-1 rounded-md"
            label="Send"
            :disabled="messageContent.trim().length < 7 || messageContent.trim().length > 58"
            variant="solid"
            @click.prevent="sign()"
          />
        </div>
        <UButton
          variant="outline"
          @click.prevent="clear()"
        >
          Logout
        </UButton>
      </div>
      <div v-else class="flex gap-2">
        <UButton
          v-for="provider in providers"
          :key="provider.slug"
          :label="provider.label"
          :color="provider.color"
          variant="solid"
          :icon="provider.icon"
          :to="provider.link"
          external
        />
      </div>
    </div>
    <div v-if="messages" class="columns-1 md:columns-2 lg:columns-4 gap-8 space-y-8">
      <div
        v-for="message in messages"
        :key="message.id"
        class="overflow-hidden sm:p-6 px-4 py-5 border border-zinc-100 p-6 dark:border-zinc-700/40 rounded-lg"
      >
        <p class="text-sm text-subtitle">
          “{{ message.message }}”
        </p>
        <div class="flex items-center gap-4 mt-4">
          <div class="h-8 w-8 rounded-full">
            <NuxtImg class="w-full h-full rounded-full" :src="message.image" alt="Nature" placeholder />
          </div>
          <p class="font-bold">
            {{ message.username }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="my-4 text-subtitle">
      <div class="flex gap-2 items-center">
        <UIcon name="i-eos-icons-loading" />
        <p>The messages are loading...</p>
      </div>
    </div>
  </section>
</template>

<style>

</style>
