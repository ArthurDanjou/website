export default defineAppConfig({
  ui: {
    gray: 'neutral',
    notifications: {
      position: 'bottom-0 right-0',
    },
    container: {
      base: 'mx-auto',
      padding: 'px-4 sm:px-6 lg:px-8',
      constrained: 'max-w-7xl',
    },
    card: {
      background: 'bg-white dark:bg-zinc-900',
    },
    dropdown: {
      background: 'bg-white dark:bg-zinc-800',
    },
    button: {
      base: 'duration-300 focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0',
    },
  },
})