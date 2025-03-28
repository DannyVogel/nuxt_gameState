<script lang="ts" setup>
import type { View } from "@/types/common.interfaces";
import type { Game, UserGame, GameUserData } from "~/types/game.interfaces";

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

const handleRemove = async () => {
  const res = await removeFromList(props.game.id);
  toast.add({ title: "Game removed", color: "rose" });
  emit("close");
};

const handleToPlay = async () => {
  const userGame = { ...props.game, status: "toPlay" };
  await addToList(userGame);
  toast.add({
    title: `${userGame.name} is waiting to be played`,
    color: "orange",
  });
  emit("close");
};

const handlePlayed = async (gameUserData: GameUserData) => {
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
};

const handleEdit = async (gameUserData: GameUserData) => {
  const userGame = { ...props.game, ...gameUserData };
  await addToList(userGame);
  toast.add({ title: "Game data updated", color: "sky" });
  emit("close");
};
</script>

<template>
  <div class="flex justify-between gap-4 px-2">
    <template v-if="view === 'to-play'">
      <ButtonRemove @remove="handleRemove" />
      <ButtonPlayed @played="handlePlayed" :state="game" />
    </template>
    <template v-else-if="view === 'played'">
      <ButtonRemove @remove="handleRemove" />
      <ButtonEdit @edited="handleEdit" :game-user-data="(game as UserGame)" />
    </template>
    <template v-else-if="view === 'search-query'">
      <ButtonToPlay @to-play="handleToPlay" />
      <ButtonPlayed @played="handlePlayed" :state="game" />
    </template>
  </div>
</template>
