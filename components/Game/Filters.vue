<script setup lang="ts">
import type { UserGame } from "~/types/game.interfaces";

const emit = defineEmits(["applyFilters", "clearFilters"]);

const userStore = useUserStore();
const gamesPlayed = ref<UserGame[]>(userStore.getGamesPlayed);
const isOpen = ref(false);

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
const yearsPlayed = ref<number[]>(userStore.getYearsPlayed);

const filters = reactive({
  status: statusOptions[0].value,
  year: yearsPlayed.value[0],
});

const filterGames = () => {
  let filteredGames = userStore.getGamesPlayed;
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
  yearsPlayed.value = Array.from(
    new Set(filteredGames.map((game) => game.yearPlayed))
  );
  gamesPlayed.value = filteredGames;
  emit("applyFilters", yearsPlayed.value, gamesPlayed.value);
  isOpen.value = false;
};

const clearFilters = () => {
  filters.status = statusOptions[0].value;
  filters.year = yearsPlayed.value[0];
  yearsPlayed.value = userStore.getYearsPlayed;
  gamesPlayed.value = userStore.getGamesPlayed;
  emit("clearFilters");
  isOpen.value = false;
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
              :options="statusOptions"
              class="flex-1"
            />
          </div>
          <div class="flex justify-between items-center gap-8">
            <p>Year:</p>
            <USelect
              v-model="filters.year"
              :options="yearsPlayed"
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
    </USlideover>
  </div>
</template>
