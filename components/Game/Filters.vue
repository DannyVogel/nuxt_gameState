<script setup lang="ts">
import type { UserGame } from "~/types/game.interfaces";
import { AtomSpinner } from "epic-spinners";

const emit = defineEmits(["applyFilters", "clearFilters"]);

const isOpen = ref(false);
const isLoading = ref(false);
const listStore = useGameList();

// Initialize with empty arrays since data will be loaded by parent
const gamesPlayed = ref<UserGame[]>([]);
const yearsPlayed = ref<number[]>([]);

// Define filter types with proper typing for USelect compatibility
interface Filters {
  status: string | undefined;
  year: number | undefined;
  comments: string | undefined;
}

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

const commentsOptions = [
  {
    label: "Yes",
    value: "true",
  },
  {
    label: "No",
    value: "false",
  },
];

const filters = reactive<Filters>({
  status: undefined,
  year: undefined,
  comments: undefined,
});

const filterGames = async () => {
  isLoading.value = true;
  try {
    // Convert undefined to null for the API and convert comments back to boolean
    emit("applyFilters", {
      status: filters.status || null,
      year: filters.year || null,
      comments: filters.comments ? filters.comments === "true" : null,
    });
    isOpen.value = false;
  } catch (error) {
    console.error("Error filtering games:", error);
  } finally {
    isLoading.value = false;
  }
};

const clearFilters = () => {
  isLoading.value = true;
  filters.status = undefined;
  filters.year = undefined;
  filters.comments = undefined;
  emit("clearFilters");
  isOpen.value = false;
  isLoading.value = false;
};

// Accept props for years and games
const props = defineProps<{
  availableYears: number[];
}>();

// Watch props to update local refs
watch(
  () => props.availableYears,
  (newYears) => {
    yearsPlayed.value = newYears;
  },
  { immediate: true }
);
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
