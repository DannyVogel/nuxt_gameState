<script lang="ts" setup>
import type { GameUserData } from "~/types/game.interfaces";

const emit = defineEmits(["played"]);

const isOpen = ref(false);

const handleSubmit = (gameUserData: GameUserData) => {
  emit("played", gameUserData);
  isOpen.value = false;
};
</script>

<template>
  <UButton
    @click="isOpen = true"
    color="teal"
    variant="outline"
    class="w-28 justify-center"
    >Played</UButton
  >
  <UModal v-model="isOpen">
    <GameUserData @submit="handleSubmit" />
  </UModal>
</template>
