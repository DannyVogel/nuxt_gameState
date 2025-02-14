<script lang="ts" setup>
const emit = defineEmits(["close"]);
const userStore = useUserStore();
// const { setDisplayName } = useUser();

const handleLogout = async () => {
  emit("close");
  useUserSession().clear();
  userStore.logOut();
};
</script>

<template>
  <div class="p-4 flex flex-col items-center justify-center gap-4 min-h-full">
    <div class="flex items-center gap-2">
      <p class="text-2xl">Hello {{ userStore.firstName }}</p>
      <!-- <UButton
        icon="i-heroicons-pencil-square"
        variant="ghost"
        @click="setDisplayName('Kelevra')"
      /> -->
    </div>
    <UButton
      @click="handleLogout"
      color="rose"
      icon="i-heroicons-power"
      class="mt-auto w-full flex justify-center"
      >Log out</UButton
    >
  </div>
</template>
