<script lang="ts" setup>
import type { Game } from "~/types/game.interfaces";
import type { View } from "@/types/common.interfaces";

const route = useRoute();
const results = ref<Game[]>([]);
const view = computed(() => route.name as View);

const resultsText = computed(() => {
  return results.value.length === 0
    ? `No results found for "${route.params.query}"`
    : results.value.length === 1
    ? `1 result for "${route.params.query}"`
    : `${results.value.length} results for "${route.params.query}"`;
});

await useFetch(`/api/search/${route.params.query}`, {
  onResponse: ({ response }) => {
    if (response.status === 200) {
      results.value = response._data.body;
    } else {
      results.value = [];
    }
  },
});
</script>

<template>
  <div class="min-h-full flex flex-col items-center justify-center">
    <div v-if="results.length === 0">
      <p class="text-primary">
        No results found for "{{ route.params.query }}"
      </p>
    </div>
    <div v-else class="flex flex-col gap-4">
      <h1 class="text-xl font-bold text-primary text-center">
        {{ resultsText }}
      </h1>
      <template v-for="game in results">
        <GameCardFull :view="view" :game="game">
          <template #buttons>
            <ButtonGroup :view="view" :game="game" />
          </template>
        </GameCardFull>
      </template>
    </div>
  </div>
</template>
