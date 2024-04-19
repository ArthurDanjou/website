import {boolean, date, integer, pgEnum, pgTable, primaryKey, serial, text, timestamp} from 'drizzle-orm/pg-core'
import {relations} from 'drizzle-orm'

// O B J E C T S

export const maintenances = pgTable('maintenances', {
  id: serial('id').primaryKey(),
  reason: text('reason').default(''),
  enabled: boolean('enabled').default(false).notNull(),
  beginAt: date('begin_at').defaultNow().notNull(),
  endAt: date('end_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const announcements = pgTable('announcements', {
  id: serial('id').primaryKey(),
  content: text('content').default('').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull(),
  likes: integer('likes').default(0).notNull(),
  views: integer('views').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const suggestions = pgTable('suggestions', {
  id: serial('id').notNull(),
  email: text('email').notNull().unique(),
  content: text('content').notNull(),
  added: boolean('added').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, t => ({
  pk: primaryKey({ columns: [t.id, t.email] }),
}))

export const guestbookMessages = pgTable('guestbook_messages', {
  id: serial('id').primaryKey(),
  message: text('message').notNull(),
  email: text('email').notNull().unique(),
  username: text('username').notNull(),
  image: text('image').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const categoriesType = pgEnum('categoryType', ['talent', 'bookmark'])

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  name: text('name').notNull(),
  type: categoriesType('type').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const talents = pgTable('talents', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  logo: text('logo').default('').notNull(),
  website: text('website').default('').notNull(),
  work: text('work').default('').notNull(),
  favorite: boolean('favorite').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const talentsToCategories = pgTable('talents_categories', {
  talentId: integer('talent_id').notNull()
    .references(() => talents.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
})

export const bookmarks = pgTable('bookmarks', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  website: text('website').default('').notNull(),
  favorite: boolean('favorite').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const bookmarksToCategories = pgTable('bookmarks_categories', {
  bookmarkId: integer('bookmark_id').notNull()
    .references(() => bookmarks.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
}, t => ({
  pk: primaryKey({ columns: [t.bookmarkId, t.categoryId] }),
}))

// R E L A T I O N S

export const talentsRelations = relations(talents, ({ many }) => ({
  talentCategories: many(talentsToCategories),
}))

export const bookmarksRelations = relations(bookmarks, ({ many }) => ({
  bookmarkCategories: many(bookmarksToCategories),
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
  talentsToCategories: many(talentsToCategories),
  bookmarksToCategories: many(bookmarksToCategories),
}))

export const talentsToCategoriesRelations = relations(talentsToCategories, ({ one }) => ({
  talent: one(talents, {
    references: [talents.id],
    fields: [talentsToCategories.talentId],
  }),
  category: one(categories, {
    references: [categories.id],
    fields: [talentsToCategories.categoryId],
  }),
}))

export const bookmarksToCategoriesRelations = relations(bookmarksToCategories, ({ one }) => ({
  bookmark: one(bookmarks, {
    references: [bookmarks.id],
    fields: [bookmarksToCategories.bookmarkId],
  }),
  category: one(categories, {
    references: [categories.id],
    fields: [bookmarksToCategories.categoryId],
  }),
}))
