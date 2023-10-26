import type { Education, JsonParsedContent, Post, Project, Skill, WorkExperience } from '../../types'

export function useProjects() {
  return useAsyncData('content:projects', () => {
    return queryContent<Project>('projects').find()
  })
}

export function useLatestProject() {
  return useAsyncData('content:latestProject', () => {
    return queryContent<Project>('projects')
      .where({
        latest: true,
      })
      .limit(1)
      .findOne()
  })
}

export function useEducations() {
  return useAsyncData('content:educations', () => {
    return queryContent<Education>('educations')
      .sort({
        endDate: -1,
      })
      .find()
  })
}

export function useWorkExperiences() {
  return useAsyncData('content:experiences', () => {
    return queryContent<WorkExperience>('experiences')
      .sort({
        endDate: -1,
      })
      .find()
  })
}

export function useSkills() {
  return useAsyncData('content:skills', () => queryContent<JsonParsedContent<Skill[]>>('skills').findOne())
}

export function usePosts() {
  return useAsyncData('content:posts', async () => {
    const posts = await queryContent<Post>('writing').find()
    return posts.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
  })
}

export function useLatestPost() {
  return useAsyncData('content:latestPost', async () => {
    const posts = await queryContent<Post>('writing').find()
    return posts.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })[0]
  })
}
