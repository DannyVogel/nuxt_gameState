<script lang="ts" setup></script>

<template>
  <div
    class="fixed bottom-0 left-0 w-full flex justify-around items-center bg-slate-800 py-3"
  >
    <NuxtLink to="/to-play">
      <img
        class="w-10 h-10"
        src="~/public/icons/gamesToPlay.png"
        alt="shopping bag with controller icon"
      />
    </NuxtLink>
    <NuxtLink to="/" class="absolute bottom-6 bg-slate-800 p-2 rounded-full">
      <img
        class="w-10 h-10"
        src="~/public/icons/search.png"
        alt="papers with controller icon"
      />
    </NuxtLink>
    <NuxtLink to="/played">
      <img
        class="w-10 h-10"
        src="~/public/icons/gamesPlayed.png"
        alt="papers with controller icon"
      />
    </NuxtLink>
  </div>
</template>
