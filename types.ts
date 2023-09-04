import type { MarkdownParsedContent, ParsedContent } from '@nuxt/content/dist/runtime/types'

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

export interface JsonParsedContent<T> extends ParsedContent {
  body: T
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
}
