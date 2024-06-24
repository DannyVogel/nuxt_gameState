<script lang="ts" setup>
const userStore = useUserStore();
const isOpen = ref(false);
</script>

<template>
  <div class="absolute top-2 right-2">
    <UButton @click="isOpen = true" variant="ghost">
      <template #leading>
        <img
          v-if="userStore.isLogged"
          src="~/public/icons/loggedInUser.png"
          alt="Open Modal"
          class="w-8 h-8 cursor-pointer"
        />
        <img
          v-else
          src="~/public/icons/loggedOutUser.png"
          alt="Open Modal"
          class="w-8 h-8 cursor-pointer"
        />
      </template>
    </UButton>
  </div>
  <UModal v-model="isOpen">
    <AuthLoggedIn v-if="userStore.isLogged" />
    <AuthLoggedOut v-else />
  </UModal>
</template>
