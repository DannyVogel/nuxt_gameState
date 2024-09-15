<script lang="ts" setup>
const userStore = useUserStore();
const db = useDb();
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-12 mt-14">
    <div class="flex flex-col items-center gap-4">
      <h3 class="text-4xl text-primary">Welcome back</h3>
      <h1
        class="text-6xl bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent"
      >
        {{ userStore.displayName }}
      </h1>
    </div>
    <div class="flex justify-between gap-12 text-primary">
      <NuxtLink to="/to-play" class="flex flex-col items-center gap-2">
        <img
          class="w-8 h-8"
          src="~/public/icons/gamesToPlay.png"
          alt="shopping bag with controller icon"
        />
        <div class="flex flex-col items-center">
          <p>{{ db.gamesToPlayCount }}</p>
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
          <p>{{ db.gamesPlayedCount }}</p>
          <p>Games</p>
          <p>played</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
