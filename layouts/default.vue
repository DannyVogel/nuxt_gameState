<script lang="ts" setup></script>

<template>
  <div class="container min-h-screen flex flex-col">
    <TheHeader />
    <div class="flex-grow">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>
