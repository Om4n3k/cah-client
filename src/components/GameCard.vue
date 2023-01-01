<script lang="ts" setup>
import {computed, onBeforeUpdate, onUpdated} from "vue";

const props = defineProps<{
  id: string,
  type: 'call'|'response'|'empty',
  text: string | string[],
  playable?: boolean,
  active?: boolean
}>();

const emit = defineEmits<{
  (e: 'activated', id: string): void
}>()

let cardClass: string;
switch (props.type) {
  case "response":
    cardClass = 'bg-neutral-300 border-white/20 text-neutral-800'; break;
  case "call":
    cardClass = 'bg-gradient-to-br from-black to-neutral-900 border-black/20 text-white'; break;
  case "empty":
    cardClass = 'bg-transparent border border-white/20'; break;
}

const cardText = computed(() => {
  if(props.type === 'empty') return '';
  if(props.type === 'call') return Array.isArray(props.text) ? props.text.join(' ___ ') : props.text + ' ___';
  else return props.text;
})

const onCardActivated = () => {
  emit('activated',props.id);
}

const updateClasses = () => {
  if (props.playable) cardClass+=' playable';
  else cardClass = cardClass.replaceAll(' playable','');
  if (props.active) cardClass+=' active';
  else cardClass = cardClass.replaceAll(' active','');
}

updateClasses();
onBeforeUpdate(() => {
  updateClasses();
})
</script>

<template>
  <div :class="cardClass" class="card" draggable="true" @click="onCardActivated">
    <span v-if="props.type !== 'empty'">
      {{cardText}}
    </span>
  </div>
</template>

<style scoped>
.card {
  @apply aspect-square text-lg h-56 p-4 shadow rounded-xl flex items-center justify-center transition-all;
}

.card.playable {
  @apply hover:scale-105 hover:rotate-3 cursor-pointer;
}

.card.active {
  @apply bg-blue-500;
}
</style>