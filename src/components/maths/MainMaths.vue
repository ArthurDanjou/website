<script lang="ts" setup>
import { Angle, Circle, Graph, Label, Line, Point, Vector, Vector2 } from '@ksassnowski/vueclid'

const angle = ref(0)
useIntervalFn(() => {
  angle.value = angle.value + 0.01
}, 10)
const to = computed(() => Vector2.fromPolar(angle.value, 4))
</script>

<template>
  <section class="flex justify-center gap-5 overflow-hidden py-4 sm:gap-8 mb-16">
    <div>
      <Graph :domain-x="[-5, 5]" :domain-y="[-5, 5]">
        <Circle :radius="4" color="hotpink" />
        <Angle
          :a="[1, 0]"
          :b="[0, 0]"
          :c="to"
          :radius="1.5"
          color="#33aabb"
          :fill="{ light: '#33aabb33', dark: '#33aabb66' }"
          dashed
        />
        <Vector :to="to" />
      </Graph>
    </div>
    <div>
      <Graph
        :domain-x="[-1.5, 1.5]"
        :domain-y="[-1.5, 1.5]"
        :grid-size="0.5"
        :units="false"
      >
        <Circle :radius="1" color="#aaa" />
        <Vector :to="[Math.cos(0.8), Math.sin(0.8)]" />
        <Line
          :from="[Math.cos(0.8), 0]"
          :to="[Math.cos(0.8), Math.sin(0.8)]"
          :line-width="1.5"
          color="hotpink"
          dashed
        />
        <Line
          :from="[0, Math.sin(0.8)]"
          :to="[Math.cos(0.8), Math.sin(0.8)]"
          :line-width="1.5"
          color="#33aabb"
          dashed
        />
        <Point :position="[Math.cos(0.8), Math.sin(0.8)]" />
        <Label :position="[Math.cos(0.8) + 0.2, Math.sin(0.8) + 0.2]" text="M" />
        <Point :position="[Math.cos(0.8), 0]" color="hotpink" label="cos(x)" />
        <Point
          :position="[0, Math.sin(0.8)]"
          color="#33aabb"
          label="sin(x)"
          label-position="top"
        />
      </Graph>
    </div>
  </section>
</template>
