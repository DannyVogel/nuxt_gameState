<script lang="ts" setup>
defineEmits(["to-play"]);
</script>

<template>
  <UButton
    @click="$emit('to-play')"
    color="orange"
    variant="outline"
    class="w-28 justify-center"
    >To Play</UButton
  >
</template>
