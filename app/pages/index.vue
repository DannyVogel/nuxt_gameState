<script lang="ts" setup>
const { loggedIn } = useUserSession();
import { AtomSpinner } from "epic-spinners";

const route = useRoute();
const router = useRouter();
const loading = ref(route.query.loading === "true");

const handleLoggedIn = () => {
  loading.value = false;
  const query = { ...route.query };
  delete query.loading;
  router.replace({ query });
};

watch(
  loggedIn,
  (newLoggedIn) => {
    if (newLoggedIn) handleLoggedIn();
  },
  { immediate: true }
);
</script>

<template>
  <div
    v-if="loading"
    class="flex justify-center items-center my-20"
  >
    <atom-spinner
      :animation-duration="1000"
      :size="50"
      :color="'rgb(59 130 246 / 0.5)'"
      class="mx-auto"
    />
  </div>
  <div
    v-else
    class="min-h-full flex flex-col gap-12"
  >
    <Welcome />
    <SearchBar />
  </div>
</template>
