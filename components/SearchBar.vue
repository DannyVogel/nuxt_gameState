<script lang="ts" setup>
const { search } = useSearch();

const state = reactive({
  search: "",
});
const doSearch = async (e: Event) => {
  console.log("Search for:", state.search);
  const results = await search(state.search);
  console.log("Results:", results);
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
