<script lang="ts" setup>
import {useBookmarksStore} from '~/store/bookmarks'

useHead({
	title: 'Discover my library • Arthur Danjou',
})

const categories = ref<Array<{ label: string, slug: string }>>([{ label: 'All', slug: 'all' }])
const { getCategory, setCategory, isFavorite, toggleFavorite } = useBookmarksStore()

const { data: bookmarks, pending } = await useFetch('/api/bookmarks', {
	method: 'get',
	query: {
		favorite: isFavorite,
		category: getCategory,
	},
	watch: [isFavorite, getCategory],
})

const { data: getCategories } = await useFetch('/api/categories', { method: 'GET', query: { type: 'bookmark' } })
getCategories.value!.forEach(category => categories.value.push({ label: category.name, slug: category.slug }))

function isCategory(slug: string) {
	return getCategory.value === slug
}

const getMarkerStyle = computed(() => {
	const selected = window.document.getElementById(categories.value.find(category => category.slug === getCategory.value)?.slug || 'all')
	return {
		top: `${selected?.offsetTop}px`,
		left: `${selected?.offsetLeft === 12 ? 4 : selected?.offsetLeft}px`,
		height: `${selected?.offsetHeight}px`,
		width: `${selected?.offsetWidth}px`,
	}
})

const appConfig = useAppConfig()
function getColor() {
	return `text-${appConfig.ui.primary}-500`
}
</script>

<template>
	<section class="w-container lg:my-24 my-16">
		<div class="max-w-2xl space-y-8 mb-16">
			<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl !leading-tight">
				My library where I save some resources
			</h1>
			<p class="leading-relaxed text-subtitle">
				You will find a selection of some of the most inspiring and complete content I have read through my research and work experience.
			</p>
		</div>
		<div
			v-if="getCategories"
			class="sticky z-40 top-[4.8rem] left-0 z-100 flex gap-2 w-full items-center justify-between"
		>
			<div class="flex gap-2 overflow-x-scroll sm:overflow-x-hidden bg-gray-100 dark:bg-gray-800 rounded-lg p-1 relative">
				<ClientOnly>
					<div
						class="absolute duration-300 left-1 ease-out focus:outline-none"
						:style="[getMarkerStyle]"
					>
						<div class="w-full h-full bg-white dark:bg-gray-900 rounded-md shadow-sm" />
					</div>
				</ClientOnly>
				<div
					v-for="category in categories"
					:id="category.slug"
					:key="category.slug"
					class="relative px-3 py-1 text-sm font-medium rounded-md h-8 text-gray-500 dark:text-gray-400 min-w-fit flex items-center justify-center w-full focus:outline-none transition-colors duration-200 ease-out cursor-pointer hover:text-black dark:hover:text-white"
					:class="{ 'text-gray-900 dark:text-white relative': isCategory(category.slug) }"
					@click.prevent="setCategory(category.slug)"
				>
					<p class="w-full">
						{{ category.label }}
					</p>
				</div>
			</div>
			<UPopover>
				<UButton
					:icon="isFavorite ? 'i-mdi-filter-variant-remove' : 'i-mdi-filter-variant'"
					color="primary"
					variant="soft"
					size="lg"
				/>
				<template #panel>
					<div
						class="flex p-2 gap-2 items-center cursor-pointer select-none text-subtitle"
						@click.prevent="toggleFavorite()"
					>
						<UIcon
							v-if="isFavorite"
							name="i-material-symbols-check-box-outline-rounded"
						/>
						<UIcon
							v-else
							name="i-material-symbols-check-box-outline-blank"
						/>
						<p>Show favorites only</p>
					</div>
				</template>
			</UPopover>
		</div>
		<UDivider class="my-2" />
		<div
			v-if="bookmarks && getCategories"
			class="mt-8"
		>
			<div
				v-if="bookmarks.length > 0 && !pending"
				class="grid grid-cols-1 gap-4 md:gap-x-16 md:gap-y-12 sm:grid-cols-2 md:grid-cols-3"
			>
				<div
					v-for="bookmark in bookmarks"
					:key="bookmark.name.toLowerCase().trim()"
					class="group relative flex justify-between items-center"
				>
					<div class="flex flex-col gap-y-1">
						<div class="flex gap-6 items-center">
							<h2 class="text-base font-semibold text-zinc-800 dark:text-zinc-100">
								<span class="absolute -inset-y-2 md:-inset-y-4 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
								<NuxtLink
									:href="bookmark.website"
									external
									target="_blank"
								>
									<span class="absolute -inset-y-2 md:-inset-y-4 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
									<div class="flex gap-2 items-center">
										<h1 class="relative z-10">
											{{ bookmark.name }}
										</h1>
										<UTooltip
											v-if="bookmark.favorite"
											text="You can set the filter to only show favorites."
										>
											<UIcon
												class="z-20 text-amber-500 text-xl font-bold hover:rotate-[143deg] duration-300"
												name="i-ic-round-star"
											/>
										</UTooltip>
									</div>
								</NuxtLink>
							</h2>
						</div>
						<div class="flex gap-2 z-10">
							<UBadge
								v-for="category in bookmark.bookmarkCategories"
								:key="category.category.slug"
								color="primary"
								variant="soft"
								size="xs"
							>
								{{ category.category.name }}
							</UBadge>
						</div>
					</div>
					<p
						:class="getColor()"
						class="relative z-10 flex text-sm font-medium items-center"
					>
						<UIcon name="i-ph-link-bold" />
						<span class="ml-2">{{ bookmark.website.replace('https://', '').replace('www.', '').replace('/', '') }}</span>
					</p>
				</div>
			</div>
			<div
				v-else-if="bookmarks?.length === 0 && !pending"
				class="my-4 text-subtitle"
			>
				<div class="flex gap-2 items-center">
					<UIcon name="i-akar-icons-cross" />
					<p>There are no bookmarks for this category. Maybe soon...</p>
				</div>
			</div>
			<div
				v-else
				class="my-4 text-subtitle"
			>
				<div class="flex gap-2 items-center">
					<UIcon name="i-eos-icons-loading" />
					<p>The bookmarks are loading...</p>
				</div>
			</div>
		</div>
	</section>
</template>
