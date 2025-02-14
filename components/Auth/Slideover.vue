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
  <USlideover v-model="isOpen">
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="relative flex justify-center items-center">
          <ColorMode />
          <h1
            class="py-2 font-bold text-4xl text-center bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent"
          >
            <p><span class="italic">game</span>State</p>
          </h1>
        </div>
        <UButton
          color="gray"
          variant="ghost"
          size="sm"
          icon="i-heroicons-x-mark-20-solid"
          class="flex absolute end-5 top-3.5 z-10"
          square
          padded
          @click="isOpen = false"
        />
      </template>
      <AuthUserMenu v-if="loggedIn" @close="isOpen = false" />
      <AuthLogin v-else @close="isOpen = false" />
      <template #footer> </template>
    </UCard>
  </USlideover>
</template>
