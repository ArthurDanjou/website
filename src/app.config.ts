export default defineAppConfig({
  ui: {
    icons: {
      dynamic: true,
    },
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
      container: 'z-50',
      background: 'bg-white dark:bg-zinc-900/90',
      item: {
        base: 'duration-300 group flex items-center gap-2 w-full',
      },
    },
    button: {
      base: 'duration-300 focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75',
    },
    popover: {
      container: 'z-50',
    },
  },
})
