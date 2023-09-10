<script setup lang="ts">
useHead({
  title: 'About me • Arthur Danjou',
})

const { data: skills } = await useSkills()
const { data: educations } = await useEducations()
const { data: experiences } = await useWorkExperiences()
</script>

<template>
  <section class="w-container lg:my-24 my-16">
    <div class="px-4 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
      <div class="lg:pl-20">
        <div class="max-w-xs px-2.5 lg:max-w-none">
          <NuxtImage src="/about.jpg" class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800" placeholder />
        </div>
      </div>
      <div class="lg:order-first lg:row-span-2">
        <div class="max-w-2xl space-y-8 mb-16">
          <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl !leading-tight">
            I'm Arthur, I live and study in France where I learn new things.
          </h1>
          <p class="leading-relaxed text-subtitle">
            As a software engineer with a passion for AI and the cloud, I have a deep understanding of emerging technologies that are transforming the way businesses and organizations operate. I am at the heart of an ever-changing and rapidly growing field. My background in mathematics also gives me an edge in understanding the mathematical concepts and theories behind these technologies as well as how to design them.
          </p>
          <p class="leading-relaxed text-subtitle">
            I enjoy sharing my knowledge and learning new theorems and technologies. I am a curious person and eager to continue learning and growing throughout your life. My passion and commitment to these subjects are admirable qualities and will help me succeed in my career and education.
          </p>
        </div>
      </div>
    </div>
    <GridSection title="Interests">
      <GridSlot title="Development">
        Development is the passion that appeared the earliest in my life. I started developing on Minecraft and then I migrated to the broad field of the web.
      </GridSlot>
      <GridSlot title="Mathematics">
        During my studies, I loved mathematics very quickly. That's why today I continue my studies in this fabulous field.
      </GridSlot>
      <GridSlot title="Artificial Intelligence">
        We hear more and more about artificial intelligence with the evolution of our society. So I quickly got interested by doing my own research and I quickly discovered that this field is closely related to mathematics, hence my interest.
      </GridSlot>
      <GridSlot title="Cloud and infrastructure">
        When you're doing development and deploying projects online, you discover and are forced to touch the cloud, infrastructure, and network. It's a totally different field than the others but just as interesting.
      </GridSlot>
      <GridSlot title="Fitness">
        In addition to my studies and programming, I go to the gym every day to relax and stay in shape. Sport allows me to recharge my batteries and move on to other things.
      </GridSlot>
    </GridSection>
    <GridSection v-if="skills" title="Skills">
      <div class="grid grid-cols-3 md:grid-cols-4 gap-2">
        <Skill
          v-for="skill in skills.body"
          :key="skill.name"
          :skill="skill"
        />
      </div>
    </GridSection>
    <GridSection v-if="experiences" title="Work Experiences">
      <Experience v-for="experience in experiences" :key="experience.title" :experience="experience" />
    </GridSection>
    <GridSection v-if="educations" title="Educations">
      <Education v-for="education in educations" :key="education.title" :education="education" />
    </GridSection>
    <div class="flex justify-center">
      <UButton
        label="Download my CV"
        icon="i-material-symbols-lab-profile-outline-rounded"
        color="primary"
        variant="outline"
        size="xl"
      />
    </div>
  </section>
</template>
