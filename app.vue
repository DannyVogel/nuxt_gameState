<script setup lang="ts">
useAuthState();
useDbState();
</script>

<template>
  <NuxtPwaManifest />
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

input {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  font-size: 16px;
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
