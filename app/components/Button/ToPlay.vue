<script lang="ts" setup>
defineEmits(["to-play"]);
const loading = defineModel<boolean>("loading", { default: false });
</script>

<template>
  <UButton
    @click="$emit('to-play')"
    color="orange"
    :loading="loading"
    variant="outline"
    class="w-28 justify-center"
    >To Play</UButton
  >
</template>
