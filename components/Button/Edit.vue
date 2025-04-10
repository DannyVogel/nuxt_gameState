<script lang="ts" setup>
import type { UserGame, GameUserData } from "~/types/game.interfaces";

const emit = defineEmits(["edited"]);
const loading = defineModel<boolean>("loading", { default: false });

defineProps({
  gameUserData: {
    type: Object as PropType<UserGame>,
    required: true,
  },
});

const isOpen = ref(false);
const handleSubmit = (gameUserData: GameUserData) => {
  isOpen.value = false;
  emit("edited", gameUserData);
};
</script>

<template>
  <UButton
    @click="isOpen = true"
    color="sky"
    variant="outline"
    class="w-28 justify-center"
    :loading="loading"
    >Edit</UButton
  >
  <UModal v-model="isOpen">
    <GameUserData @submit="handleSubmit" :state="gameUserData" />
  </UModal>
</template>
