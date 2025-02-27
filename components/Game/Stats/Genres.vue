<script setup lang="ts">
interface Genre {
  genre: string;
  count: number;
}

defineProps({
  genres: {
    type: Array as () => Genre[],
    required: true,
  },
});
</script>

<template>
  <div
    class="backdrop-blur-sm bg-black/30 rounded-lg p-6 shadow hover:shadow-lg transition-all duration-300"
  >
    <h3 class="text-xl font-bold mb-4 text-white flex items-center">
      <UIcon name="i-ph-tag" class="mr-2 text-primary" />
      Top Genres
    </h3>
    <ul class="flex flex-col space-y-3">
      <li
        v-for="(genre, index) in genres"
        :key="index"
        class="flex items-center"
      >
        <span
          class="w-6 h-6 flex items-center justify-center bg-primary text-white rounded-full text-sm mr-3"
          >{{ index + 1 }}</span
        >
        <span class="flex-1 text-gray-300">{{ genre.genre }}</span>
        <span class="font-bold text-primary">{{ genre.count }}</span>
      </li>
    </ul>
  </div>
</template>
