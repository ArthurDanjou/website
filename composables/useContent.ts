import type { Education, Post, Project, Skill, WorkExperience } from '~~/types'

export function getProjects() {
  return useAsyncData('content:projects', () => {
    return queryContent<Project>('projects').find()
  })
}

export function getEducations() {
  return useAsyncData('content:educations', () => {
    return queryContent<Education>('educations')
      .sort({
        endDate: -1,
      })
      .find()
  })
}

export function getWorkExperiences() {
  return useAsyncData('content:experiences', async () => {
    const experiences = await queryContent<WorkExperience>('experiences').find()
    return experiences.sort((a, b) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    })
  })
}

export function getSkills() {
  return useAsyncData('content:skills', () => queryContent<Skill[]>('skills').findOne())
}

export function getPosts() {
  return useAsyncData('content:posts', async () => {
    const posts = await queryContent<Post>('writing').find()
    return posts.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
  })
}
