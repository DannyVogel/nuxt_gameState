<script lang="ts" setup>
// @ts-ignore
import { AtomSpinner } from "epic-spinners";
import type { Game } from "~/types/game.interfaces";
import type { View } from "@/types/common.interfaces";

const route = useRoute();
const { search } = useSearch();
const isLoading = ref(true);
const results = ref<Game[]>([]);
const view = computed(() => route.name as View);

onMounted(async () => {
  results.value = await search(route.params.query as string);
  isLoading.value = false;
});
</script>

<template>
  <div class="min-h-full flex flex-col items-center justify-center">
    <atom-spinner
      v-if="isLoading"
      :animation-duration="1000"
      :size="100"
      :color="'rgb(59 130 246 / 0.5)'"
      class="mt-20"
    />
    <template v-else>
      <div v-if="results.length === 0">
        <p class="text-primary">
          No results found for "{{ route.params.query }}"
        </p>
      </div>
      <div v-else class="flex flex-col gap-4">
        <h1 class="text-xl font-bold text-primary text-center">
          {{ results.length }} Results for "{{ route.params.query }}"
        </h1>
        <template v-for="game in results">
          <GameCardFull :view="view" :game="game">
            <template #buttons>
              <ButtonGroup :view="view" :game="game" />
            </template>
          </GameCardFull>
        </template>
      </div>
    </template>
  </div>
</template>
