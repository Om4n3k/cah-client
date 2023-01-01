<script setup lang="ts">
import GameCard from "./components/GameCard.vue";
import {reactive, ref} from "vue";

const playersCount = ref(6);

const cardSet = reactive([
  {
    text: 'Ja',
    id: crypto.randomUUID(),
    active: false,
  },
  {
    text: 'Twój stary',
    id: crypto.randomUUID(),
    active: false,
  },
  {
    text: 'Twoja stara',
    id: crypto.randomUUID(),
    active: false,
  },
])

const onCardActivated = (id: string) => {
  for (const oldCard of cardSet) {
    if(oldCard.id === id) continue;
    oldCard.active = false;
  }
  const card = cardSet.find(x => x.id === id);
  if(!card) return alert('Card not found');
  card.active = !card.active;
}
</script>

<template>
  <header class="dark:bg-gray-900">
    <div class="mx-auto container h-16 flex items-center">
      Hello
    </div>
  </header>
  <main class="mt-16">
    <div class="flex flex-col items-center gap-4 space-y-16 container mx-auto">
      <div class="flex gap-4">
        <GameCard type="call" id="random" :text="['Zawsze chciałem być','bo mój stary tak chciał','Elo']"/>
        <div class="flex gap-4 flex-wrap">
          <GameCard v-for="player in playersCount" :id="player.toString()" :key="player" type="empty" text=""/>
        </div>
      </div>
      <div class="flex gap-4">
        <GameCard v-for="card in cardSet" :text="card.text" :id="card.id" :key="card.id" type="response" :playable="true" :active="card.active" @activated="onCardActivated"/>
      </div>
      <button class="bg-blue-500 px-6 py-4 rounded hover:bg-blue-600 transition-colors">Confirm selection</button>
    </div>
  </main>
</template>

<style scoped>
</style>
