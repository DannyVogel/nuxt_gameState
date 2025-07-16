<script setup lang="ts">
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="flex flex-col items-center gap-8 my-20">
    <p class="text-center text-2xl max-w-xs mx-auto">
      Link your Google account to save your games
    </p>
    <NuxtLink to="/api/auth/google" external>
      <UButton
        icon="mdi:google"
        color="white"
        size="xl"
        class="w-60 flex justify-center py-2"
      >
        Login with Google
      </UButton>
    </NuxtLink>
  </div>
</template>
