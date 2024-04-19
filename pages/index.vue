<script setup lang="ts">
useHead({
	title: 'Arthur Danjou • Software Engineer and Maths Lover',
})
</script>

<template>
	<section>
		<Announcement />
		<MainBanner />
		<div class="px-4 lg:px-44 md:px-16 sm:px-8 w-full my-16 grid grid-cols-1 md:grid-cols-2 md:gap-x-16 gap-y-4 md:gap-y-16">
			<MainActivity />
			<MainStats />
		</div>
	</section>
</template>
