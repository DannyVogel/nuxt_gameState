<script setup lang="ts">
useHeadSafe({
  title: "gameState",
  meta: [
    {
      name: "description",
      content: "A simple game tracker powered by IGDB",
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>

<style>
* {
  font-family: "Tilt Warp", cursive, sans-serif;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
