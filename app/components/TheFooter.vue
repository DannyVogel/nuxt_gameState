<script lang="ts" setup>
import { version } from "../../package.json";
const { loggedIn } = useUserSession();
</script>

<template>
  <div
    class="h-16 fixed bottom-0 left-0 w-full flex justify-around items-center bg-slate-400 dark:bg-slate-800 py-3 bg-opacity-90"
  >
    <NuxtLink
      v-if="loggedIn"
      to="/to-play"
    >
      <img
        class="w-10 h-10"
        src="/icons/gamesToPlay.png"
        alt="shopping bag with controller icon"
      />
    </NuxtLink>
    <NuxtLink
      to="/"
      class="absolute bottom-6 bg-slate-400 dark:bg-slate-800 p-2 rounded-full bg-opacity-90"
    >
      <img
        class="w-10 h-10"
        src="/icons/search.png"
        alt="papers with controller icon"
      />
    </NuxtLink>
    <NuxtLink
      v-if="loggedIn"
      to="/played"
    >
      <img
        class="w-10 h-10"
        src="/icons/gamesPlayed.png"
        alt="papers with controller icon"
      />
    </NuxtLink>
    <p
      class="absolute bottom-0 left-1/2 -translate-x-1/2 text-gray-700 text-xs"
    >
      {{ version }}
    </p>
  </div>
</template>
