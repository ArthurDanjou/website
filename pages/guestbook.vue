<script lang="ts" setup>
import {providers} from '~~/types'

useHead({
  title: 'Sign my guestbook • Arthur Danjou',
})

const { loggedIn, clear, user } = useUserSession()
const { data: messages, refresh } = useFetch('/api/messages', { method: 'get' })

const isOpen = ref(false)

const toast = useToast()
const messageContent = ref<string>('')
async function sign() {
  if (messageContent.value.length < 7 || messageContent.value.length > 250)
    return

  isOpen.value = false
  await $fetch('/api/message', {
    method: 'post',
    body: {
      message: messageContent.value,
    },
  }).then(async () => {
    toast.add({
      title: `Thanks for leaving a message!`,
      description: 'Your can see it at the top of the messages.',
      icon: 'i-material-symbols-check-circle-outline-rounded',
      timeout: 4000,
    })
    await refresh()
  }).catch(() => {
    toast.add({
      title: 'An error occurred when signing the book!',
      color: 'red',
    })
  })
  messageContent.value = ''
}
async function deleteMessage(id: number) {
  if (!user.value.admin)
    return

  await $fetch('/api/message', {
    method: 'delete',
    body: {
      id,
    },
  }).then(async () => {
    toast.add({
      title: `Message successfully deleted`,
      icon: 'i-material-symbols-check-circle-outline-rounded',
      color: 'green',
      timeout: 4000,
    })
    await refresh()
  }).catch(() => {
    toast.add({
      title: 'An error occured when deleting a message!',
      color: 'red',
    })
  })
}
</script>

<template>
  <section class="w-container lg:mt-24 my-8">
    <div class="max-w-2xl space-y-8 md:mb-16 mb-8">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl !leading-tight">
        You want to leave a message ?
      </h1>
      <p class="leading-relaxed text-subtitle">
        Your opinion means a lot to me. Feel free to share your impressions of my projects, explore my site, or simply leave a personalised message. Your comments are a source of inspiration and continuous improvement. Thank you for taking the time to contribute to this virtual community. I look forward to reading what you have to share!
      </p>
    </div>
    <div class="flex justify-center md:justify-start">
      <UButton
        class="mb-8 md:mb-16"
        label="Want to sign my book ?"
        icon="i-ph-circle-wavy-question-bold"
        @click.prevent="isOpen = true"
      />
    </div>
    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h1
                v-if="loggedIn"
                class="text-md font-bold"
              >
                Enter just below your message to sign my book
              </h1>
              <h1
                v-else
                class="text-md font-bold"
              >
                Sign before writing your message
              </h1>
            </div>
            <UButton
              class="-my-1"
              color="gray"
              icon="i-heroicons-x-mark-20-solid"
              variant="ghost"
              @click="isOpen = false"
            />
          </div>
        </template>
        <div>
          <div
            v-if="loggedIn"
            class="flex items-center justify-between gap-4"
          >
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
                :disabled="messageContent.trim().length < 7 || messageContent.trim().length > 250"
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
          <div
            v-else
            class="flex gap-2 justify-center"
          >
            <UButton
              v-for="provider in providers"
              :key="provider.slug"
              :label="provider.label"
              color="black"
              variant="solid"
              :to="provider.link"
              :icon="provider.icon"
              :external="true"
            />
          </div>
        </div>
      </UCard>
    </UModal>
    <div
      v-if="messages"
      class="columns-1 md:columns-2 lg:columns-4 gap-8 space-y-8"
    >
      <div
        v-for="message in messages"
        :key="message.id"
        class="relative overflow-hidden sm:p-6 px-4 py-5 border border-zinc-100 p-6 dark:border-zinc-700/40 rounded-lg"
      >
        <p class="text-sm text-subtitle">
          “{{ message.message }}”
        </p>
        <div class="flex items-center gap-4 mt-4">
          <div class="h-8 w-8 rounded-full">
            <img
              :src="message.image"
              alt="Author profile picture"
              class="w-full h-full rounded-full"
            >
          </div>
          <p class="font-bold">
            {{ message.username }}
          </p>
        </div>
        <UButton
          v-if="user && user.admin"
          class="absolute top-1 right-1"
          icon="i-material-symbols-delete-forever-outline-rounded"
          color="red"
          variant="ghost"
          :ui="{ rounded: 'rounded-full' }"
          size="xs"
          @click.prevent="deleteMessage(message.id)"
        />
      </div>
    </div>
    <div
      v-else
      class="my-4 text-subtitle"
    >
      <div class="flex gap-2 items-center">
        <UIcon name="i-eos-icons-loading" />
        <p>The messages are loading...</p>
      </div>
    </div>
  </section>
</template>

<style>

</style>
