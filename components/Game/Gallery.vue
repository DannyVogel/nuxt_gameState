<script lang="ts" setup>
import type { Game } from "~/types/game.interfaces";
import type { CarouselRef } from "~/types/ui.interfaces";

defineProps({
  game: {
    type: Object as () => Game,
    required: true,
  },
});

const carouselRef = ref<CarouselRef | null>(null);

watchEffect(() => {
  if (carouselRef.value && !carouselRef.value.next) {
    carouselRef.value.page = 1;
  }
});

const loopImages = (nextClickedonLast: boolean) => {
  if (!carouselRef.value) return;
  if (nextClickedonLast) {
    carouselRef.value.select(1);
  } else {
    carouselRef.value.select(carouselRef.value.pages);
  }
};
</script>

<template>
  <UCarousel
    ref="carouselRef"
    :items="game.screenshots"
    :prev-button="{
      color: 'gray',
      icon: 'i-heroicons-chevron-left-20-solid',
      class: 'w-5 h-5 flex items-center justify-center left-2',
    }"
    :next-button="{
      color: 'gray',
      icon: 'i-heroicons-chevron-right-20-solid',
      class: 'w-5 h-5 flex items-center justify-center right-2',
    }"
    arrows
    indicators
    :ui="{ item: 'basis-full' }"
  >
    <template #default="{ item }">
      <img :src="item" draggable="false" />
    </template>

    <template #prev="{ onClick, disabled }">
      <UButton
        :disabled="disabled"
        @click="onClick"
        size="xs"
        icon="i-heroicons-chevron-left-20-solid"
        class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 bg-opacity-70 rounded-full ring-gray-600"
        :class="{ hidden: disabled }"
        variant="outline"
      />
    </template>

    <template #next="{ onClick, disabled }">
      <UButton
        :disabled="disabled"
        @click="onClick"
        size="xs"
        icon="i-heroicons-chevron-right-20-solid"
        class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 bg-opacity-70 rounded-full ring-gray-600"
        :class="{ hidden: disabled }"
        variant="outline"
      />
    </template>
    <template #indicator="{ onClick, page, active }">
      <UButton
        :variant="active ? 'solid' : 'soft'"
        size="2xs"
        class="rounded-full min-w-6 justify-center"
        @click="onClick(page)"
      />
    </template>
  </UCarousel>
</template>
