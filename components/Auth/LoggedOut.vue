<script setup lang="ts">
const auth = useAuth();

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
  await auth.logIn(state.email, state.password);
  state.email = "";
  state.password = "";
}
</script>

<template>
  <UForm :state="state" class="space-y-4 p-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>
