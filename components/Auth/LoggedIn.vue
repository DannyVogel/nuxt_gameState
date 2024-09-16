<script lang="ts" setup>
const userStore = useUserStore();
const fbAuth = useFBAuth();
const { setDisplayName } = useUser();
</script>

<template>
  <div class="p-4 flex flex-col items-center justify-center gap-4">
    <div class="flex items-center gap-2">
      <p>Hello {{ userStore.displayName }}</p>
      <UButton
        icon="i-heroicons-pencil-square"
        variant="ghost"
        @click="setDisplayName('Kelevra')"
      />
    </div>
    <UButton @click="fbAuth.logout" color="red">Log out</UButton>
  </div>
</template>
