import type {MarkdownParsedContent, ParsedContent} from '@nuxt/content/dist/runtime/types'

export enum ColorsTheme {
  RED = 'red',
  ORANGE = 'orange',
  AMBER = 'amber',
  YELLOW = 'yellow',
  LIME = 'lime',
  GREEN = 'green',
  EMERALD = 'emerald',
  TEAL = 'teal',
  CYAN = 'cyan',
  SKY = 'sky',
  BLUE = 'blue',
  INDIGO = 'indigo',
  VIOLET = 'violet',
  PURPLE = 'purple',
  FUCHSIA = 'fuchsia',
  PINK = 'pink',
  ROSE = 'rose',
}

interface WakatimeData {
  name: string
  percent: number
}

export interface Stats {
  coding: {
    data: {
      grand_total: {
        total_seconds_including_other_language: number
      }
      range: {
        start: string
      }
    }
  }
  editors: {
    data: Array<WakatimeData>
  }
  os: {
    data: Array<WakatimeData>
  }
  languages: {
    data: Array<WakatimeData>
  }
}

interface LanyardActivity {
  name: string
  state: string
  details: string
  timestamps: {
    start: number
  }
}

export interface Activity {
  data: {
    activities: Array<LanyardActivity>
  }
}

export interface Post extends MarkdownParsedContent {
  slug: string
  title: string
  description: string
  readingMins: number
  publishedAt: string
  cover?: string
}

export interface Project extends MarkdownParsedContent {
  name: string
  description: string
  latest: boolean
  link: string
  icon: string
  skills: Skill[]
  tags: string[]
}

export interface WorkExperience extends MarkdownParsedContent {
  title: string
  description: string
  company: string
  location: string
  companyLink: string
  startDate: string
  endDate: string | 'Today'
}

export interface Education extends MarkdownParsedContent {
  title: string
  description: string
  location: string
  startDate: string
  endDate: string | 'Today'
}

export interface Skill extends ParsedContent {
  name: string
  icon: string & {
    dark: string
    light: string
  }
  color: string
  link: string
}

export const providers = [
  {
    slug: 'github',
    label: 'Login with Github',
    icon: 'i-ph-github-logo-bold',
    link: '/auth/github',
  },
  /* {
    slug: 'twitter',
    label: 'Login with Twitter',
    icon: 'i-ph-twitter-logo-bold',
    link: '/auth/twitter',
  }, */
  {
    slug: 'google',
    label: 'Login with Google',
    icon: 'i-ph-google-logo-bold',
    link: '/auth/google',
  },
]

export const otherTab = [
  [
    {
      label: 'Talents',
      to: '/talents',
      icon: 'i-ph-users-bold',
    },
    {
      label: 'Guestbook',
      to: '/guestbook',
      icon: 'i-material-symbols-book-2-outline',
    },
    {
      label: 'Bookmarks',
      to: '/bookmarks',
      icon: 'i-material-symbols-bookmark-add-outline-rounded',
    },
  ],
]

export const navs = [
  {
    label: 'Home',
    to: '/',
    icon: 'i-ph-house-bold',
  },
  {
    label: 'About',
    to: '/about',
    icon: 'i-ph-person-arms-spread-bold',
  },
  /* {
    label: 'Articles',
    to: '/writing',
    icon: 'i-ph-pencil-bold',
  }, */
  {
    label: 'Projects',
    to: '/work',
    icon: 'i-ph-flask-bold',
  },
  {
    label: 'Uses',
    to: '/uses',
    icon: 'i-ph-tree-evergreen-bold',
  },
  ...otherTab,
  {
    label: 'Contact',
    open: true,
    icon: 'i-ph-push-pin-bold',
  },
].flat()

export const IDEs = [
  { name: 'Visual Studio Code', icon: 'i-skill-icons-vscode-light' },
  { name: 'IntelliJ IDEA Ultimate', icon: 'i-skill-icons-idea-light' },
  { name: 'WebStorm', icon: 'i-skill-icons-webstorm-light' },
]
