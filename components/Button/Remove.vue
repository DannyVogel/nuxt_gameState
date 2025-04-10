<script lang="ts" setup>
defineEmits(["remove"]);
const loading = defineModel<boolean>("loading", { default: false });
</script>

<template>
  <UButton
    @click="$emit('remove')"
    color="rose"
    variant="outline"
    class="w-28 justify-center"
    :loading="loading"
    >Remove</UButton
  >
</template>
