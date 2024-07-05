<script lang="ts" setup>
// @ts-ignore
import { AtomSpinner } from "epic-spinners";

const router = useRouter();
const isLoading = ref(false);
const state = reactive({
  search: "",
});

const doSearch = async () => {
  isLoading.value = true;
  router.push("/search/" + state.search);
};
</script>

<template>
  <div class="max-w-xs mx-auto">
    <div v-if="isLoading" class="mx-auto">
      <atom-spinner
        :animation-duration="1000"
        :size="50"
        :color="'rgb(59 130 246 / 0.5)'"
        class="mx-auto"
      />
      <p class="mt-1 text-primary text-sm animate-pulse text-center">
        Searching...
      </p>
    </div>
    <UForm v-else :state="state" @submit="doSearch">
      <UInput
        v-model="state.search"
        name="q"
        placeholder="Find a game..."
        size="xl"
        icon="i-heroicons-magnifying-glass-20-solid"
        autocomplete="off"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
            v-show="state.search !== ''"
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark-20-solid"
            :padded="false"
            @click="state.search = ''"
          />
        </template>
      </UInput>
    </UForm>
  </div>
</template>
