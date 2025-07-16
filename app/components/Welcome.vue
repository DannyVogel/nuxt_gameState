<script lang="ts" setup>
const { user, loggedIn } = useUserSession();
const { getGamesCount } = useGameList();

const { data: gamesCount } = await useAsyncData(
  "getGamesCount",
  () => getGamesCount(),
  {
    default: () => ({
      gamesToPlay: 0,
      gamesPlayed: 0,
    }),
    lazy: true,
    watch: [loggedIn],
  }
);
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-12 mt-10 text-primary"
  >
    <div class="flex flex-col items-center gap-4">
      <h3 class="text-4xl">Welcome {{ loggedIn ? "back" : "" }}</h3>
      <h1
        v-if="loggedIn"
        class="text-6xl bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent"
      >
        {{ user?.displayName }}
      </h1>
      <p
        v-else
        class="text-center text-primary max-w-xs px-4"
      >
        Search for your favorite games and add them to your lists
      </p>
    </div>
    <div class="flex justify-between gap-8 text-primary">
      <NuxtLink
        to="/to-play"
        class="flex flex-col items-center gap-2"
      >
        <img
          class="w-8 h-8"
          src="/icons/gamesToPlay.png"
          alt="shopping bag with controller icon"
        />
        <div class="flex flex-col items-center">
          <p v-if="loggedIn">{{ gamesCount.gamesToPlay }}</p>
          <p>Games</p>
          <p>to play</p>
        </div>
      </NuxtLink>
      <NuxtLink
        to="/played"
        class="flex flex-col items-center gap-2"
      >
        <img
          class="w-8 h-8"
          src="/icons/gamesPlayed.png"
          alt="papers with controller icon"
        />
        <div class="flex flex-col items-center">
          <p v-if="loggedIn">{{ gamesCount.gamesPlayed }}</p>
          <p>Games</p>
          <p>played</p>
        </div>
      </NuxtLink>
    </div>
    <NuxtLink
      v-if="loggedIn"
      to="/stats"
      class="flex items-center gap-2"
    >
      <UIcon
        name="i-ph-chart-bar-duotone"
        class="w-8 h-8 text-gray-600 dark:text-white"
      />
      <div class="flex flex-col items-center">
        <p>Game Stats</p>
      </div>
    </NuxtLink>
    <p
      v-if="!loggedIn"
      class="text-center text-primary max-w-xs px-4"
    >
      <NuxtLink
        to="/api/auth/google"
        external
        class="underline text-black dark:text-white"
        >Login</NuxtLink
      >
      to start tracking your games!
    </p>
  </div>
</template>
