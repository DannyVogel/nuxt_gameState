<script setup lang="ts">
import type { UserGame } from "~/types/game.interfaces";
// @ts-ignore
import { AtomSpinner } from "epic-spinners";

const emit = defineEmits(["applyFilters", "clearFilters"]);

const isOpen = ref(false);
const isLoading = ref(false);
const listStore = useGameList();
const gamesPlayed = ref<UserGame[]>(listStore.gamesPlayed);

const statusOptions = [
  {
    label: "Playing",
    value: "playing",
  },
  {
    label: "Beat",
    value: "beat",
  },
  {
    label: "Dropped",
    value: "dropped",
  },
];
const yearsPlayed = ref<number[]>(listStore.yearsPlayed);
const commentsOptions = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

const filters = reactive({
  status: null,
  year: null,
  comments: null,
});

const filterGames = () => {
  isLoading.value = true;
  let filteredGames = listStore.gamesPlayed;
  if (filters.status) {
    filteredGames = filteredGames.filter(
      (game) => game.status === filters.status
    );
  }
  if (filters.year) {
    filteredGames = filteredGames.filter(
      (game) => game.yearPlayed === filters.year
    );
  }
  if (filters.comments) {
    filteredGames = filteredGames.filter((game) => game.comments);
  }
  yearsPlayed.value = Array.from(
    new Set(filteredGames.map((game) => game.yearPlayed))
  );
  gamesPlayed.value = filteredGames;
  emit("applyFilters", yearsPlayed.value, gamesPlayed.value);
  isOpen.value = false;
  isLoading.value = false;
};

const clearFilters = () => {
  isLoading.value = true;
  filters.status = null;
  filters.year = null;
  filters.comments = null;
  yearsPlayed.value = listStore.yearsPlayed;
  gamesPlayed.value = listStore.gamesPlayed;
  emit("clearFilters");
  isOpen.value = false;
  isLoading.value = false;
};
</script>

<template>
  <div>
    <UButton icon="i-heroicons-funnel" variant="ghost" @click="isOpen = true" />

    <USlideover v-model="isOpen">
      <div class="p-4 flex-1">
        <UButton
          color="gray"
          variant="ghost"
          size="sm"
          icon="i-heroicons-x-mark-20-solid"
          class="flex sm:hidden absolute end-5 top-4 z-10"
          square
          padded
          @click="isOpen = false"
        />
        <h3 class="mb-10 text-2xl font-bold text-center text-primary">
          Filters
        </h3>
        <div class="mb-10 flex flex-col gap-4">
          <div class="flex justify-between items-center gap-4">
            <p>Status:</p>
            <USelect
              v-model="filters.status"
              placeholder="Select Status"
              :options="statusOptions"
              class="flex-1"
            />
          </div>
          <div class="flex justify-between items-center gap-8">
            <p>Year:</p>
            <USelect
              v-model="filters.year"
              placeholder="Select Year"
              :options="yearsPlayed"
              class="flex-1"
            />
          </div>
          <div class="flex justify-between items-center gap-8">
            <p>Comments:</p>
            <USelect
              v-model="filters.comments"
              placeholder="Select Comments"
              :options="commentsOptions"
              class="flex-1"
            />
          </div>
        </div>
        <div class="flex justify-around gap-4">
          <UButton
            label="Apply"
            class="flex-1 justify-center"
            @click="filterGames"
          />
          <UButton
            label="Clear"
            variant="outline"
            class="flex-1 justify-center"
            @click="clearFilters"
          />
        </div>
      </div>
      <div
        v-if="isLoading"
        class="absolute h-full w-full bg-black bg-opacity-50 flex items-center"
      >
        <atom-spinner
          :animation-duration="1000"
          :size="100"
          :color="'rgb(59 130 246 / 0.5)'"
          class="mx-auto"
        />
      </div>
    </USlideover>
  </div>
</template>
