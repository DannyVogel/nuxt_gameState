<script lang="ts" setup>
const emit = defineEmits(["close"]);

const handleLogout = async () => {
  emit("close");
  useUserSession().clear();
};

const { user, loggedIn } = useUserSession();
</script>

<template>
  <div class="p-4 flex flex-col items-center justify-center gap-4 min-h-full">
    <div class="flex items-center gap-2">
      <p v-if="loggedIn" class="text-2xl">Hello {{ user?.displayName }}</p>
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
