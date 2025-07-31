<script setup lang="ts">
import { AtomSpinner } from "epic-spinners";

const emit = defineEmits(["applyFilters", "clearFilters"]);
const route = useRoute();
const router = useRouter();

const isOpen = ref(false);
const isLoading = ref(false);

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

// Initialize filters from URL query parameters
const filters = reactive<Filters>({
  status: route.query.status as string | undefined,
  year: route.query.year ? Number(route.query.year) : undefined,
  comments: route.query.comments as string | undefined,
});

// Apply initial filters if any query parameters exist
onMounted(() => {
  if (route.query.status || route.query.year || route.query.comments) {
    filterGames();
  }
});

const hasActiveFilters = computed(() => {
  return (
    filters.status !== undefined ||
    filters.year !== undefined ||
    filters.comments !== undefined
  );
});

const filterGames = async () => {
  isLoading.value = true;
  try {
    const filterParams = {
      status: filters.status || null,
      year: filters.year || null,
      comments: filters.comments ? filters.comments === "true" : null,
    };

    // Update URL query parameters
    await router.replace({
      query: {
        ...(filterParams.status && { status: filterParams.status }),
        ...(filterParams.year && { year: filterParams.year }),
        ...(filterParams.comments !== null && {
          comments: filterParams.comments.toString(),
        }),
      },
    });

    emit("applyFilters", filterParams);
    isOpen.value = false;
  } catch (error) {
    console.error("Error filtering games:", error);
  } finally {
    isLoading.value = false;
  }
};

const clearFilters = async () => {
  isLoading.value = true;
  filters.status = undefined;
  filters.year = undefined;
  filters.comments = undefined;

  // Clear URL query parameters
  await router.replace({ query: {} });

  emit("clearFilters");
  isOpen.value = false;
  isLoading.value = false;
};
</script>

<template>
  <div class="flex gap-1">
    <UButton
      icon="i-heroicons-funnel"
      variant="ghost"
      :color="hasActiveFilters ? 'primary' : 'gray'"
      @click="isOpen = true"
    />
    <UButton
      v-if="hasActiveFilters"
      icon="i-heroicons-x-mark"
      variant="ghost"
      color="red"
      @click="clearFilters"
    />
  </div>

  <USlideover v-model="isOpen">
    <div class="p-6 flex-1 backdrop-blur-sm bg-black/30">
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
      <h3 class="text-xl font-bold text-white mb-6 text-center">Filters</h3>

      <div class="space-y-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-300 flex items-center gap-2">
            <UIcon name="i-ph-flag" class="flex-shrink-0" />
            <span>Status</span>
          </label>
          <USelect
            v-model="filters.status"
            placeholder="Select Status"
            :options="statusOptions"
            class="focus:border-primary/50"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-300 flex items-center gap-2">
            <UIcon name="i-ph-calendar" class="flex-shrink-0" />
            <span>Year</span>
          </label>
          <UInput
            v-model="filters.year"
            type="number"
            placeholder="Enter year"
            :min="1900"
            :max="new Date().getFullYear()"
            class="focus:border-primary/50"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-300 flex items-center gap-2">
            <UIcon name="i-ph-chat-circle" class="flex-shrink-0" />
            <span>Comments</span>
          </label>
          <USelect
            v-model="filters.comments"
            placeholder="Select Comments"
            :options="commentsOptions"
            class="focus:border-primary/50"
          />
        </div>
      </div>

      <div class="flex gap-2 mt-6">
        <UButton
          color="primary"
          class="flex-1 justify-center bg-primary/80 hover:bg-primary transition-colors duration-200"
          @click="filterGames"
        >
          <UIcon name="i-ph-funnel" class="mr-1" />
          Apply Filters
        </UButton>
        <UButton
          color="gray"
          variant="outline"
          class="flex-1 justify-center"
          @click="clearFilters"
        >
          <UIcon name="i-ph-x" class="mr-1" />
          Clear
        </UButton>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="absolute inset-0 bg-black/50 flex items-center backdrop-blur-sm"
    >
      <atom-spinner
        :animation-duration="1000"
        :size="100"
        :color="'rgb(59 130 246 / 0.5)'"
        class="mx-auto"
      />
    </div>
  </USlideover>
</template>
