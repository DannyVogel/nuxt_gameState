<script lang="ts" setup></script>

<template>
  <div class="container mx-auto min-h-svh flex flex-col max-w-screen-lg">
    <TheHeader />
    <div class="p-4 flex-grow mb-20">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>
