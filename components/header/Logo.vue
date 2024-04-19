<script lang="ts" setup>
const appConfig = useAppConfig()
const getTextColor = computed(() => `text-${appConfig.ui.primary}-500`)

function getGroupColor() {
	return `group-hover:text-${appConfig.ui.primary}-500`
}
</script>

<template>
	<NuxtLink
		class="flex gap-1 items-center rounded-xl group text-xl !bg-transparent !dark:bg-transparent"
		to="/"
	>
		<span
			:class="getTextColor"
			class="font-black group-hover:text-black dark:group-hover:text-white duration-300"
		>Arthur</span>
		<span
			:class="getGroupColor()"
			class="font-bold text-gray-300 dark:text-neutral-600 duration-300"
		>/</span>
		<span
			:class="getTextColor"
			class="font-black group-hover:text-black dark:group-hover:text-white duration-300"
		>Danjou</span>
	</NuxtLink>
</template>
