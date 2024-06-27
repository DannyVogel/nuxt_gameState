<script lang="ts" setup>
import type { UserGame, GameUserData } from "~/types/game.interfaces";

const emit = defineEmits(["edited"]);
defineProps({
  gameUserData: {
    type: Object as PropType<UserGame>,
    required: true,
  },
});
const isOpen = ref(false);
const handleSubmit = (gameUserData: GameUserData) => {
  emit("edited", gameUserData);
  isOpen.value = false;
};
</script>

<template>
  <UButton
    @click="isOpen = true"
    color="sky"
    variant="outline"
    class="w-28 justify-center"
    >Edit</UButton
  >
  <UModal v-model="isOpen">
    <GameUserData @submit="handleSubmit" :state="gameUserData" />
  </UModal>
</template>
