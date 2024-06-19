<script lang="ts" setup>
const router = useRouter();
const state = reactive({
  search: "",
});
const doSearch = async (e: Event) => {
  router.push("/search/" + state.search);
};
</script>

<template>
  <div class="max-w-xs mx-auto">
    <UForm :state="state" @submit="doSearch">
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
