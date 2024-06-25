<script setup lang="ts">
useAuthState();
useDbState();
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
</style>
