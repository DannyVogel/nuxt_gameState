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
  <div class="flex flex-col items-center justify-center gap-12 mt-10">
    <div class="flex flex-col items-center gap-4">
      <h3 class="text-4xl text-primary">
        Welcome {{ loggedIn ? "back" : "" }}
      </h3>
      <h1
        v-if="loggedIn"
        class="text-6xl bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent"
      >
        {{ user?.displayName }}
      </h1>
      <p v-else class="text-center text-primary max-w-xs px-4">
        Search for your favorite games and add them to your lists
      </p>
    </div>
    <div class="flex justify-between gap-8 text-primary">
      <NuxtLink to="/to-play" class="flex flex-col items-center gap-2">
        <img
          class="w-8 h-8"
          src="~/public/icons/gamesToPlay.png"
          alt="shopping bag with controller icon"
        />
        <div class="flex flex-col items-center">
          <p v-if="loggedIn">{{ gamesCount.gamesToPlay }}</p>
          <p>Games</p>
          <p>to play</p>
        </div>
      </NuxtLink>
      <NuxtLink to="/played" class="flex flex-col items-center gap-2">
        <img
          class="w-8 h-8"
          src="~/public/icons/gamesPlayed.png"
          alt="papers with controller icon"
        />
        <div class="flex flex-col items-center">
          <p v-if="loggedIn">{{ gamesCount.gamesPlayed }}</p>
          <p>Games</p>
          <p>played</p>
        </div>
      </NuxtLink>
      <NuxtLink to="/stats" class="flex flex-col items-center gap-2">
        <svg
          class="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 13V17M16 11V17M12 7V17M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="flex flex-col items-center">
          <p>Game</p>
          <p>Stats</p>
        </div>
      </NuxtLink>
    </div>
    <p v-if="!loggedIn" class="text-center text-primary max-w-xs px-4">
      <NuxtLink to="/api/auth/google" external class="underline text-white"
        >Login</NuxtLink
      >
      to start tracking your games!
    </p>
  </div>
</template>
