<script lang="ts" setup></script>

<template>
  <div class="flex flex-col items-center justify-center gap-20 mt-20">
    <div class="flex flex-col items-center gap-4">
      <h3 class="text-4xl text-primary">Welcome back</h3>
      <h1
        class="text-6xl bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent"
      >
        Kelevra
      </h1>
    </div>
    <div class="flex justify-between gap-12 text-primary">
      <div class="flex flex-col items-center">
        <img
          class="w-8 h-8"
          src="~/public/icons/gamesToPlay.png"
          alt="shopping bag with controller icon"
        />
        <p>Games</p>
        <p>to play</p>
      </div>
      <div class="flex flex-col items-center">
        <img
          class="w-8 h-8"
          src="~/public/icons/gamesPlayed.png"
          alt="papers with controller icon"
        />
        <p>Games</p>
        <p>played</p>
      </div>
    </div>
  </div>
</template>
