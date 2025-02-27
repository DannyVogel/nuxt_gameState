<script setup lang="ts">
interface StatusBreakdown {
  beat: number;
  playing: number;
  toPlay: number;
  dropped: number;
}

const props = defineProps({
  statusBreakdown: {
    type: Object as () => StatusBreakdown,
    required: true,
    validator: (value: unknown) => {
      const val = value as StatusBreakdown;
      return (
        "beat" in val && "playing" in val && "toPlay" in val && "dropped" in val
      );
    },
  },
  totalGames: {
    type: Number,
    required: true,
  },
});

// Calculate pie chart segments
function calculatePieSegment(value: number, total: number): number {
  return (value / total) * 100 || 0;
}

// Calculate pie chart offsets
function calculateOffset(previousSum: number, total: number): number {
  return 25 - (previousSum / total) * 100 || 25;
}
</script>

<template>
  <div
    class="backdrop-blur-sm bg-black/30 rounded-lg p-6 shadow hover:shadow-lg transition-all duration-300"
  >
    <h3 class="text-xl font-bold mb-4 text-white flex items-center">
      <UIcon name="i-ph-pie-chart" class="mr-2 text-primary" />
      Game Status
    </h3>
    <div class="flex items-center justify-around flex-col sm:flex-row gap-4">
      <div class="w-28 h-28">
        <svg viewBox="0 0 100 100" class="transform -rotate-90">
          <circle
            v-if="statusBreakdown.beat > 0"
            r="25"
            cx="50"
            cy="50"
            fill="transparent"
            stroke="#4ade80"
            stroke-width="50"
            :stroke-dasharray="`${calculatePieSegment(
              statusBreakdown.beat,
              totalGames
            )} 100`"
            stroke-dashoffset="25"
          />
          <circle
            v-if="statusBreakdown.playing > 0"
            r="25"
            cx="50"
            cy="50"
            fill="transparent"
            stroke="#3b82f6"
            stroke-width="50"
            :stroke-dasharray="`${calculatePieSegment(
              statusBreakdown.playing,
              totalGames
            )} 100`"
            :stroke-dashoffset="`${calculateOffset(
              statusBreakdown.beat,
              totalGames
            )}`"
          />
          <circle
            v-if="statusBreakdown.toPlay > 0"
            r="25"
            cx="50"
            cy="50"
            fill="transparent"
            stroke="#a855f7"
            stroke-width="50"
            :stroke-dasharray="`${calculatePieSegment(
              statusBreakdown.toPlay,
              totalGames
            )} 100`"
            :stroke-dashoffset="`${calculateOffset(
              statusBreakdown.beat + statusBreakdown.playing,
              totalGames
            )}`"
          />
          <circle
            v-if="statusBreakdown.dropped > 0"
            r="25"
            cx="50"
            cy="50"
            fill="transparent"
            stroke="#ef4444"
            stroke-width="50"
            :stroke-dasharray="`${calculatePieSegment(
              statusBreakdown.dropped,
              totalGames
            )} 100`"
            :stroke-dashoffset="`${calculateOffset(
              statusBreakdown.beat +
                statusBreakdown.playing +
                statusBreakdown.toPlay,
              totalGames
            )}`"
          />
        </svg>
      </div>

      <div class="flex flex-col space-y-2">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-green-400"></span>
          <span class="text-gray-300">Beat ({{ statusBreakdown.beat }})</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-blue-500"></span>
          <span class="text-gray-300"
            >Playing ({{ statusBreakdown.playing }})</span
          >
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-purple-500"></span>
          <span class="text-gray-300"
            >To Play ({{ statusBreakdown.toPlay }})</span
          >
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-red-500"></span>
          <span class="text-gray-300"
            >Dropped ({{ statusBreakdown.dropped }})</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
