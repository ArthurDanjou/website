<script setup lang="ts">
const appConfig = useAppConfig()
const getColor = computed(() => appConfig.ui.primary)
</script>

<template>
	<div>
		<NuxtLoadingIndicator :color="getColor" />
		<section class="fixed inset-0 flex justify-center sm:px-8">
			<div class="flex w-full max-w-9xl">
				<div class="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
			</div>
		</section>
		<div class="relative z-50 min-h-[100svh]">
			<Header :navigation="false" />
			<UContainer>
				<NuxtPage />
			</UContainer>
			<Footer />
		</div>
	</div>
</template>
