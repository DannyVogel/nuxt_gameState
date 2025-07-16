<script lang="ts" setup>
const emit = defineEmits(["played"]);
const loading = defineModel<boolean>("loading", { default: false });

defineProps({
  state: {
    type: Object as PropType<Game>,
    required: false,
    default: null,
  },
});

const isOpen = ref(false);
const handleSubmit = (gameUserData: GameUserData) => {
  isOpen.value = false;
  emit("played", gameUserData);
};
</script>

<template>
  <UButton
    @click="isOpen = true"
    color="teal"
    variant="outline"
    class="w-28 justify-center"
    :loading="loading"
    >Played</UButton
  >
  <UModal v-model="isOpen">
    <GameUserData
      @submit="handleSubmit"
      :state="(state as UserGame)"
    />
  </UModal>
</template>
