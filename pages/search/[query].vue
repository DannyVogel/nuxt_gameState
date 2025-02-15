<script lang="ts" setup>
import type { Game } from "~/types/game.interfaces";
import type { View } from "@/types/common.interfaces";
import type { NitroResponse } from "~/types/auth.interfaces";

const route = useRoute();
const view = computed(() => route.name as View);

const resultsText = computed(() => {
  if (!searchResponse.value.payload) return "";
  const query = `"${route.params.query}"`;
  const count = searchResponse.value.payload.length;

  if (count === 0) return `No results found for ${query}`;
  if (count === 1) return `1 result for ${query}`;
  return `${count} results for ${query}`;
});

const { data: searchResponse } = await useFetch<NitroResponse<Game[]>>(
  `/api/search/${route.params.query}`,
  {
    default() {
      return {
        statusCode: 200,
        statusMessage: "Ok",
        payload: [],
        message: "No results found",
      };
    },
  }
);
</script>

<template>
  <div class="min-h-full flex flex-col items-center justify-center">
    <div v-if="searchResponse.payload?.length === 0">
      <p class="text-primary">
        No results found for "{{ route.params.query }}"
      </p>
    </div>
    <div v-else class="flex flex-col gap-4">
      <h1 class="text-xl font-bold text-primary text-center">
        {{ resultsText }}
      </h1>
      <template v-for="game in searchResponse.payload">
        <SearchResult :view="view" :game="game">
          <template #buttons>
            <ButtonGroup :view="view" :game="game" />
          </template>
        </SearchResult>
      </template>
    </div>
  </div>
</template>
