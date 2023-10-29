export default defineAppConfig({
  ui: {
    gray: 'neutral',
    primary: 'cyan',
    notifications: {
      position: 'bottom-0 right-0',
    },
    container: {
      base: 'mx-auto',
      padding: 'px-4 sm:px-6 lg:px-8',
      constrained: 'max-w-7xl',
    },
    dropdown: {
      background: 'bg-white dark:bg-zinc-800',
      item: {
        base: 'duration-300 group flex items-center gap-2 w-full',
      },
    },
    button: {
      base: 'duration-300 focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75',
    },
    popover: {
      container: 'z-30',
    },
  },
})
