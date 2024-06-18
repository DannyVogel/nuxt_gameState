<script lang="ts" setup></script>

<template>
  <div class="container mx-auto min-h-screen grid grid-rows-[56px,1fr,72px]">
    <TheHeader />
    <div class="">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>
