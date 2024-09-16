<script lang="ts" setup>
const emit = defineEmits(["close"]);
const userStore = useUserStore();
const fbAuth = useFBAuth();
const { setDisplayName } = useUser();

const handleLogout = async () => {
  emit("close");
  await fbAuth.logout();
};
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
    <UButton @click="handleLogout" color="red">Log out</UButton>
  </div>
</template>
