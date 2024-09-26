<script lang="ts" setup>
import loggedUser from "~/public/icons/loggedInUser.png";
import loggedOutUser from "~/public/icons/loggedOutUser.png";

const { loggedIn } = useUserSession();

const isOpen = ref(false);
</script>

<template>
  <div class="absolute top-2 right-2">
    <UButton @click="isOpen = true" variant="ghost">
      <template #leading>
        <img
          :src="loggedIn ? loggedUser : loggedOutUser"
          alt="Open Auth Modal"
          class="w-8 h-8 cursor-pointer"
        />
      </template>
    </UButton>
  </div>
  <UModal v-model="isOpen">
    <AuthLoggedIn v-if="loggedIn" @close="isOpen = false" />
    <AuthLoggedOut v-else @close="isOpen = false" />
  </UModal>
</template>
