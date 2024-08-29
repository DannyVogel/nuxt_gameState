<script lang="ts" setup>
import type { GameUserData } from "~/types/game.interfaces";

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
  <div class="p-4">
    <h3
      class="text-lg text-center pb-4 bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent">
      Add To Games Played
    </h3>
    <UForm
      :state="gameUserData"
      @submit="onSubmit"
      class="flex flex-col justify-center gap-2">
      <div class="flex items-center justify-between gap-2 flex-nowrap">
        <p class="text-sm">Date played:</p>
        <div class="flex items-center justify-between gap-2">
          <UInput
            v-model="gameUserData.monthPlayed"
            type="number"
            name="monthPlayed"
            id="monthPlayed"
            :min="1"
            :max="12"
            placeholder="MM" />
          /
          <UInput
            v-model="gameUserData.yearPlayed"
            type="number"
            name="yearPlayed"
            id="yearPlayed"
            :min="1900"
            :max="new Date().getFullYear()"
            placeholder="YYYY"
            required />
        </div>
      </div>
      <div class="flex justify-between gap-2">
        <p class="text-sm">Status:</p>
        <USelect v-model="gameUserData.status" :options="statuses" />
      </div>
      <div class="flex justify-between gap-2">
        <p class="text-sm">Comments:</p>
        <UTextarea v-model="gameUserData.comments" size="sm" />
      </div>
      <UButton type="submit" color="teal" class="w-full justify-center"
        >Submit</UButton
      >
    </UForm>
  </div>
</template>
