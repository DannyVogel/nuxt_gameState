<script lang="ts" setup>
const emit = defineEmits(["close"]);
const props = defineProps({
  view: {
    type: String as PropType<View>,
    required: true,
    validator: (value: string) =>
      ["to-play", "played", "search-query"].includes(value),
  },
  game: {
    type: Object as PropType<Game | UserGame>,
    required: true,
  },
});

const toast = useToast();
const { removeFromList, addToList } = useGameList();
const isRemoveLoading = ref(false);
const isPlayedLoading = ref(false);
const isEditLoading = ref(false);
const isToPlayLoading = ref(false);

const handleRemove = async () => {
  isRemoveLoading.value = true;
  try {
    await removeFromList(props.game.id);
    toast.add({ title: "Game removed", color: "rose" });
    emit("close");
  } finally {
    isRemoveLoading.value = false;
  }
};

const handleToPlay = async () => {
  isToPlayLoading.value = true;
  try {
    const userGame = { ...props.game, status: "toPlay" };
    await addToList(userGame);
    toast.add({
      title: `${userGame.name} is waiting to be played`,
      color: "orange",
    });
    emit("close");
  } finally {
    isToPlayLoading.value = false;
  }
};

const handlePlayed = async (gameUserData: GameUserData) => {
  isPlayedLoading.value = true;
  try {
    const userGame = { ...props.game, ...gameUserData };
    await addToList(userGame);
    let title = userGame.name;
    if (userGame.status === "beat") {
      title += " has been beaten";
    } else if (userGame.status === "dropped") {
      title += " was dropped";
    } else {
      title += " is being played";
    }
    toast.add({ title, color: "teal" });
    emit("close");
  } finally {
    isPlayedLoading.value = false;
  }
};

const handleEdit = async (gameUserData: GameUserData) => {
  isEditLoading.value = true;
  try {
    const userGame = { ...props.game, ...gameUserData };
    await addToList(userGame);
    toast.add({ title: "Game data updated", color: "sky" });
    emit("close");
  } finally {
    isEditLoading.value = false;
  }
};
</script>

<template>
  <div class="flex justify-between gap-4 px-2">
    <template v-if="view === 'to-play'">
      <ButtonRemove
        @remove="handleRemove"
        v-model:loading="isRemoveLoading"
      />
      <ButtonPlayed
        @played="handlePlayed"
        :state="game"
        v-model:loading="isPlayedLoading"
      />
    </template>
    <template v-else-if="view === 'played'">
      <ButtonRemove
        @remove="handleRemove"
        v-model:loading="isRemoveLoading"
      />
      <ButtonEdit
        @edited="handleEdit"
        :game-user-data="(game as UserGame)"
        v-model:loading="isEditLoading"
      />
    </template>
    <template v-else-if="view === 'search-query'">
      <ButtonToPlay
        @to-play="handleToPlay"
        v-model:loading="isToPlayLoading"
      />
      <ButtonPlayed
        @played="handlePlayed"
        :state="game"
        v-model:loading="isPlayedLoading"
      />
    </template>
  </div>
</template>
