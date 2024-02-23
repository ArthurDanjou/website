<script lang="ts" setup>
import { Circle, FunctionPlot, Graph, Label, Line, Point, Vector } from '@ksassnowski/vueclid'

const angle = ref(45)
const time = ref(0)
useIntervalFn(() => {
  angle.value = angle.value === 1 ? 0 : angle.value + 0.01
  time.value += 0.1
}, 10)
</script>

<template>
  <section class="flex flex-col md:flex-row items-center justify-center gap-5 overflow-hidden py-4 sm:gap-8 mb-16">
    <div>
      <Graph :domain-x="[-3, 3]" :domain-y="[-3, 3]">
        <FunctionPlot
          :function="(x) => Math.cos(x)"
          :line-width="2"
          animated
          color="hotpink"
        />
        <Label text="cos(x)" color="hotpink" :position="[2, -0.5]" size="small" />
        <FunctionPlot
          :function="(x) => Math.sin(x)"
          :line-width="2"
          animated
          color="#33aabb"
        />
        <Label text="sin(x)" color="#33aabb" :position="[2, 1]" size="small" />
        <FunctionPlot
          :function="(x) => Math.exp(x)"
          :line-width="2"
          animated
        />
        <Label text="exp(x)" :position="[0.7, 2]" size="small" />
        <FunctionPlot
          :function="(x) => Math.log(x)"
          :domain="[0.001, 4]"
          :line-width="2"
          animated
          color="limegreen"
        />
        <Label text="ln(x)" color="limegreen" :position="[0.2, -2]" size="small" />
        <FunctionPlot
          :function="(x) => -x"
          :domain="[-3, 0]"
          :line-width="2"
          animated
          color="orange"
        />
        <FunctionPlot
          :function="(x) => x"
          :domain="[0, 3]"
          :line-width="2"
          animated
          color="orange"
        />
        <Label text="|x|" color="orange" :position="[-2, 2]" size="small" />
      </Graph>
    </div>
    <div>
      <Graph
        :domain-x="[-2, 2]"
        :domain-y="[-2, 2]"
      >
        <Circle :radius="1" color="#aaa" />
        <Vector :to="[Math.cos(angle), Math.sin(angle)]" />
        <Line
          :from="[Math.cos(angle), 0]"
          :to="[Math.cos(angle), Math.sin(angle)]"
          :line-width="1.5"
          color="hotpink"
          dashed
        />
        <Line
          :from="[0, Math.sin(angle)]"
          :to="[Math.cos(angle), Math.sin(angle)]"
          :line-width="1.5"
          color="#33aabb"
          dashed
        />
        <Point :position="[Math.cos(angle), Math.sin(angle)]" label="M" />
        <Point :position="[Math.cos(angle), 0]" color="hotpink" label="cos(x)" />
        <Point
          :position="[0, Math.sin(angle)]"
          color="#33aabb"
          label="sin(x)"
          label-position="top"
        />
      </Graph>
    </div>
  </section>
</template>
