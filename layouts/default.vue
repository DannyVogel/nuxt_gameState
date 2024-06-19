<script lang="ts" setup></script>

<template>
  <div
    class="container mx-auto min-h-screen max-h-screen grid grid-rows-[56px,1fr,72px]"
  >
    <TheHeader />
    <div class="p-4 overflow-x-hidden max-h-full">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>
