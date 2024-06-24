<script setup lang="ts">
const authState = useAuthState();
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
* {
  font-family: "Tilt Warp", cursive, sans-serif;
}
</style>
