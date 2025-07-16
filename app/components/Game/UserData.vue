<script lang="ts" setup>
const emit = defineEmits(["submit"]);
const props = defineProps({
  state: {
    type: Object as PropType<GameUserData>,
    required: false,
    default: null,
  },
});

const gameUserData = reactive({
  monthPlayed:
    props.state.monthPlayed ?? (new Date().getMonth() + 1).toString(),
  yearPlayed: props.state.yearPlayed ?? new Date().getFullYear().toString(),
  status: props.state.status ?? "playing",
  comments: props.state.comments ?? "",
});

const statuses = ["playing", "beat", "dropped"];

const statusOptions = computed(() =>
  statuses.map((status) => ({
    label: status.charAt(0).toUpperCase() + status.slice(1),
    value: status,
  }))
);

const onSubmit = () => {
  const data = {
    monthPlayed: gameUserData.monthPlayed.toString(),
    yearPlayed: gameUserData.yearPlayed.toString(),
    status: gameUserData.status,
    comments: gameUserData.comments,
  };
  emit("submit", data);
};
</script>

<template>
  <div class="p-6 backdrop-blur-sm bg-black/30 rounded-lg">
    <h3 class="text-xl font-bold text-white mb-6 text-center">
      Add To Games Played
    </h3>
    <UForm
      :state="gameUserData"
      @submit="onSubmit"
      class="flex flex-col justify-center gap-4"
    >
      <div class="space-y-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-300 flex items-center gap-2">
            <UIcon
              name="i-ph-calendar"
              class="flex-shrink-0"
            />
            <span>Date Played</span>
          </label>
          <div class="flex items-center gap-2">
            <UInput
              v-model="gameUserData.monthPlayed"
              type="number"
              name="monthPlayed"
              id="monthPlayed"
              :min="1"
              :max="12"
              placeholder="MM"
              class="focus:border-primary/50"
            />
            <span class="text-gray-400">/</span>
            <UInput
              v-model="gameUserData.yearPlayed"
              type="number"
              name="yearPlayed"
              id="yearPlayed"
              :min="1900"
              :max="new Date().getFullYear()"
              placeholder="YYYY"
              required
              class="focus:border-primary/50"
            />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-300 flex items-center gap-2">
            <UIcon
              name="i-ph-game-controller"
              class="flex-shrink-0"
            />
            <span>Status</span>
          </label>
          <USelect
            v-model="gameUserData.status"
            :options="statusOptions"
            class="focus:border-primary/50"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-300 flex items-center gap-2">
            <UIcon
              name="i-ph-chat-circle"
              class="flex-shrink-0"
            />
            <span>Comments</span>
          </label>
          <UTextarea
            v-model="gameUserData.comments"
            size="sm"
            class="focus:border-primary/50"
          />
        </div>
      </div>

      <UButton
        type="submit"
        color="primary"
        class="w-full justify-center mt-2 bg-primary/80 hover:bg-primary transition-colors duration-200"
      >
        <UIcon
          name="i-ph-floppy-disk"
          class="mr-1"
        />
        Save
      </UButton>
    </UForm>
  </div>
</template>
