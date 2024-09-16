<script setup lang="ts">
const fbAuth = useFBAuth();

const state = reactive({
  email: "",
  password: "",
});
const errorMessage = ref("");

async function onSubmit(event: Event) {
  if (!state.email || !state.password) {
    errorMessage.value = "Please fill in all fields";
    return;
  }
  await fbAuth.login(state.email, state.password);
  state.email = "";
  state.password = "";
}
</script>

<template>
  <UForm :state="state" class="space-y-4 p-4" @submit="onSubmit">
    <UFormGroup size="xl" label="Email" name="email">
      <UInput size="xl" v-model="state.email" />
    </UFormGroup>

    <UFormGroup size="xl" label="Password" name="password">
      <UInput size="xl" v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit">Submit</UButton>
  </UForm>
</template>
