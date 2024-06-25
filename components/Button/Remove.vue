<script lang="ts" setup>
defineEmits(["remove"]);
</script>

<template>
  <UButton
    @click="$emit('remove')"
    color="rose"
    variant="outline"
    class="w-28 justify-center"
    >Remove</UButton
  >
</template>
