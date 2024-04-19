<script setup lang="ts">
import type {Education} from '~~/types'

defineProps({
	education: Object as PropType<Education>,
})
</script>

<template>
	<div
		v-if="education"
		class="group relative flex flex-col items-start"
	>
		<div class="flex flex-col">
			<div>
				<DateTag
					:end-date="education.endDate"
					:start-date="education.startDate"
				/>
			</div>
			<h1 class="my-1 text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
				{{ education.title }}
			</h1>
		</div>
		<p class="text-justify leading-5 text-sm text-zinc-600 dark:text-zinc-400">
			{{ education.location }} — {{ education.description }}
		</p>
	</div>
</template>
