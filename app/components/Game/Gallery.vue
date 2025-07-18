<script lang="ts" setup>
defineProps({
  game: {
    type: Object as () => Game,
    required: true,
  },
});

const carouselRef = ref<CarouselRef | null>(null);

// Add a loading state
const imageLoaded = ref(false);

const handleImageLoad = () => {
  imageLoaded.value = true;
};

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
  <div class="relative aspect-video bg-gray-900/50">
    <UCarousel
      v-if="game.screenshotIds && game.screenshotIds.length > 0"
      ref="carouselRef"
      :items="game.screenshotIds"
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
      :ui="{
        container: 'relative',
        item: 'basis-full aspect-video',
      }"
    >
      <template #default="{ item }">
        <div class="relative w-full h-full">
          <NuxtImg
            :src="getImageScreenshot(item)"
            draggable="false"
            preload
            :placeholder="[16, 9]"
            class="w-full h-full object-cover"
            @load="handleImageLoad"
          />
        </div>
      </template>

      <template #prev="{ onClick, disabled }">
        <UButton
          :disabled="disabled"
          @click="onClick"
          size="xs"
          icon="i-heroicons-chevron-left-20-solid"
          class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full border-0 z-10 transition-colors duration-200"
          :class="{ 'opacity-0': disabled }"
          variant="outline"
        />
      </template>

      <template #next="{ onClick, disabled }">
        <UButton
          :disabled="disabled"
          @click="onClick"
          size="xs"
          icon="i-heroicons-chevron-right-20-solid"
          class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full border-0 z-10 transition-colors duration-200"
          :class="{ 'opacity-0': disabled }"
          variant="outline"
        />
      </template>

      <template #indicator="{ onClick, page, active }">
        <UButton
          :variant="active ? 'solid' : 'ghost'"
          size="2xs"
          class="rounded-full min-w-6 bg-white/20 hover:bg-white/40 transition-colors duration-200"
          :class="{ '!bg-white': active }"
          @click="onClick(page)"
        />
      </template>
    </UCarousel>
  </div>
</template>
