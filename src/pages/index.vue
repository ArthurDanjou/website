<script setup lang="ts">
useHead({
  title: 'Arthur Danjou • Software Engineer and Maths Lover',
})

const { data: latestArticle, pending } = await useLatestPost()
const format = (date: string) => useDateFormat(date, 'D MMMM YYYY').value.replaceAll('"', '')
</script>

<template>
  <section>
    <Announcement />
    <MainBanner />
    <MainPhotos />
    <div class="w-container my-16 flex flex-col md:flex-row gap-8 justify-between md:gap-32">
      <div class="md:w-1/2 space-y-8">
        <MainSection icon="i-ph-person-arms-spread-bold" title="Discover more about me">
          <p>
            I'm a software engineer interested in AI, cloud and emerging technologies. I have a strong mathematical background and a passion for learning and sharing knowledge.
          </p>
          <template #footer>
            <UButton
              label="Move to the about page"
              icon="i-ph-arrow-up-right-bold"
              trailing
              block
              variant="soft"
              to="/about"
            />
          </template>
        </MainSection>
        <MainSection v-if="pending || !latestArticle" icon="i-ph-pencil-line-bold" title="Read my latest article">
          <p>
            The content is loading
          </p>
          <template #footer>
            <UButton
              label="Loading content"
              trailing
              block
              loading
            />
          </template>
        </MainSection>
        <MainSection v-else icon="i-ph-pencil-line-bold" :title="latestArticle?.title">
          <div>
            <h3>{{ latestArticle.description }}</h3>
            <div class="text-sm italic">
              {{ format(latestArticle.publishedAt) }} — {{ latestArticle.readingMins }} min.
            </div>
          </div>
          <template #footer>
            <UButton
              label="Read my latest article"
              icon="i-ph-arrow-up-right-bold"
              trailing
              block
              variant="soft"
              :to="`writing/${latestArticle.slug}`"
            />
          </template>
        </MainSection>
        <MainSection icon="i-ph-users-bold" title="The curated list of talents">
          <p>
            My talents page highlights inspiring web talents I've discovered through research and work experience, including creative designers, talented web developers, and open-source contributors.
          </p>
          <template #footer>
            <UButton
              label="Move on"
              icon="i-ph-arrow-up-right-bold"
              trailing
              block
              variant="soft"
              to="/talents"
            />
          </template>
        </MainSection>
      </div>
      <div class="md:w-1/2 gap-8 flex flex-col">
        <MainSection icon="i-ph-person-arms-spread-bold" title="My environment">
          <p>
            My uses page provides insights into the software, hardware, and favorite tech stack I use for software development, gaming, work, and learning. It's a comprehensive list of my preferred tools and resources.
          </p>
          <template #footer>
            <UButton
              label="Move on"
              icon="i-ph-arrow-up-right-bold"
              trailing
              block
              variant="soft"
              to="/uses"
            />
          </template>
        </MainSection>
        <MainSection icon="i-ph-person-arms-spread-bold" title="Discover more about me">
          Bookmarks
          <template #footer>
            <UButton
              label="Move on"
              icon="i-ph-arrow-up-right-bold"
              trailing
              block
              variant="soft"
              to="/bookmarks"
            />
          </template>
        </MainSection>
      </div>
    </div>
  </section>
</template>
