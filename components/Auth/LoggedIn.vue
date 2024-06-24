<script lang="ts" setup>
const userStore = useUserStore();
const auth = useAuth();
</script>

<template>
  <div class="p-4 flex flex-col items-center justify-center gap-4">
    <p>Hello {{ userStore.name }}</p>
    <UButton @click="auth.logOut" color="red">Log out</UButton>
  </div>
</template>
