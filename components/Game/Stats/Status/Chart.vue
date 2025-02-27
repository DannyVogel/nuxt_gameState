<script lang="ts" setup>
import type { GameStats } from "~/types/game.interfaces";

type StatusBreakdown = GameStats["statusBreakdown"];

const props = defineProps({
  statusBreakdown: {
    type: Object as () => StatusBreakdown,
    required: true,
  },
  totalGames: {
    type: Number,
    required: true,
  },
});

const segments = computed(() => {
  const total = props.totalGames;
  if (total === 0) return [];

  const categories = [
    { name: "beat", value: props.statusBreakdown.beat, color: "#4ade80" },
    { name: "playing", value: props.statusBreakdown.playing, color: "#3b82f6" },
    { name: "toPlay", value: props.statusBreakdown.toPlay, color: "#a855f7" },
    { name: "dropped", value: props.statusBreakdown.dropped, color: "#ef4444" },
  ];

  const nonZeroCategories = categories.filter((cat) => cat.value > 0);

  let cumulativeAngle = 0;
  return nonZeroCategories.map((category) => {
    const percentage = (category.value / total) * 100;
    const startAngle = cumulativeAngle;
    cumulativeAngle += percentage * 3.6;

    const largeArcFlag = percentage > 50 ? 1 : 0;

    const startRadians = ((startAngle - 90) * Math.PI) / 180;
    const endRadians = ((startAngle + percentage * 3.6 - 90) * Math.PI) / 180;

    const startX = 50 + 40 * Math.cos(startRadians);
    const startY = 50 + 40 * Math.sin(startRadians);
    const endX = 50 + 40 * Math.cos(endRadians);
    const endY = 50 + 40 * Math.sin(endRadians);

    const path = `M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

    return {
      ...category,
      percentage,
      path,
      startAngle,
      largeArcFlag,
    };
  });
});
</script>

<template>
  <div class="w-28 h-28 relative">
    <svg v-if="totalGames === 0" viewBox="0 0 100 100" class="w-full h-full">
      <circle
        r="40"
        cx="50"
        cy="50"
        fill="transparent"
        stroke="#6b7280"
        stroke-width="20"
        stroke-dasharray="100 100"
        stroke-dashoffset="25"
      />
      <text x="50" y="55" text-anchor="middle" class="text-xs fill-white">
        No data
      </text>
    </svg>

    <svg v-else viewBox="0 0 100 100" class="w-full h-full">
      <path
        v-for="segment in segments"
        :key="segment.name"
        :d="segment.path"
        :fill="segment.color"
      />
      <circle
        v-if="segments.length > 0"
        r="20"
        cx="50"
        cy="50"
        fill="#1f2937"
      />
    </svg>
  </div>
</template>
