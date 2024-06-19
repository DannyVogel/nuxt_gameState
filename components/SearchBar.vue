<script lang="ts" setup>
const search = ref("");
</script>

<template>
  <div class="max-w-xs mx-auto">
    <UInput
      v-model="search"
      name="q"
      placeholder="Find a game..."
      size="xl"
      icon="i-heroicons-magnifying-glass-20-solid"
      autocomplete="off"
      :ui="{ icon: { trailing: { pointer: '' } } }"
    >
      <template #trailing>
        <UButton
          v-show="search !== ''"
          color="gray"
          variant="link"
          icon="i-heroicons-x-mark-20-solid"
          :padded="false"
          @click="search = ''"
        />
      </template>
    </UInput>
  </div>
</template>
