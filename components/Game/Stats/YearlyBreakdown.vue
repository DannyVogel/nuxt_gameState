<script setup lang="ts">
const props = defineProps({
  yearlyBreakdown: {
    type: Array as () => Array<{ year: string; count: number }>,
    required: true,
  },
});

function calculateYearlyBarWidth(count: number): string {
  const maxWidth = 200;
  const maxValue = Math.max(...props.yearlyBreakdown.map((item) => item.count));
  const width = maxValue > 0 ? (count / maxValue) * maxWidth : 0;
  return `${width}px`;
}
</script>

<template>
  <div
    class="backdrop-blur-sm bg-black/30 rounded-lg p-6 shadow hover:shadow-lg transition-all duration-300"
  >
    <h3 class="text-xl font-bold mb-4 text-white flex items-center">
      <UIcon name="i-ph-calendar" class="mr-2 text-primary" />
      Yearly Breakdown
    </h3>
    <div class="overflow-y-auto max-h-60 pr-2">
      <div
        v-for="item in yearlyBreakdown"
        :key="item.year"
        class="grid grid-cols-[40px_1fr_40px] items-center gap-3 mb-3 group"
      >
        <span class="text-right text-gray-300">{{ item.year }}</span>
        <div
          class="h-4 bg-gray-700/50 rounded-full overflow-hidden group-hover:bg-gray-600/60 transition-colors duration-200"
        >
          <div
            class="h-full bg-primary/80 group-hover:bg-primary rounded-full transition-all duration-300"
            :style="{ width: calculateYearlyBarWidth(item.count) }"
          ></div>
        </div>
        <span class="font-bold text-primary text-left">{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>
