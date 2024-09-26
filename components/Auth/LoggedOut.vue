<script setup lang="ts">
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="flex items-center justify-center my-10">
    <NuxtLink to="/api/auth/google" external>Login with Google</NuxtLink>
  </div>
</template>
