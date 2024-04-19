<template>
	<header class="z-30 sticky top-0 left-0 flex justify-center w-full">
		<div class="w-full px-4 sm:px-6 lg:px-8 sm:mx-8 max-w-9xl py-4 grid grid-cols-2 lg:grid-cols-3 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-300/10">
			<Logo />
			<div class="hidden grow lg:flex justify-center">
				<NavBar />
			</div>
			<div class="flex justify-end gap-2 items-center">
				<ThemePicker />
				<MobileNavBar />
			</div>
		</div>
	</header>
</template>
