<script lang="ts" setup>
useHead({
	title: 'My work • Arthur Danjou',
})
const { data: projects } = await getProjects()
</script>

<template>
	<section class="w-container lg:my-24 my-16">
		<div class="px-4 max-w-3xl space-y-8">
			<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl !leading-tight">
				All my projects can be found on GitHub and by scrolling down.
			</h1>
			<p class="leading-relaxed text-subtitle">
				I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.
			</p>
		</div>
		<div class="mt-16 md:mt-20">
			<div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
				<div
					v-for="project in projects"
					:key="project.name"
					class="group relative flex flex-col justify-between"
				>
					<div class="flex items-start gap-4">
						<div class="relative z-10 flex p-2 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
							<UIcon
								:name="project.icon"
								dynamic
								size="24"
							/>
						</div>
						<div>
							<h2 class="text-base font-semibold text-zinc-800 dark:text-zinc-100">
								<div class="absolute -inset-y-4 md:-inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
								<NuxtLink
									:to="project.link"
									target="_blank"
								>
									<span class="absolute -inset-y-4 md:-inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
									<span class="relative z-10">{{ project.title }}</span>
								</NuxtLink>
							</h2>
							<p class="relative z-10 text-sm text-zinc-600 dark:text-zinc-400">
								{{ project.description }}
							</p>
						</div>
					</div>
					<div class="mt-2 flex gap-2 z-10 flex-wrap">
						<UBadge
							v-for="tag in project.tags"
							:key="tag"
							color="primary"
							variant="soft"
							size="xs"
						>
							{{ tag }}
						</UBadge>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
