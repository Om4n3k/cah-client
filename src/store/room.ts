import {defineStore} from "pinia";
import Player from "../models/Player";
import {state} from "vue-tsc/out/shared";

export const useRoomStore = defineStore('room', {
  state: () => ({
    name: '',
    players: [] as Player[],
    maxScore: 8,
    round: 0,
    timeLeft: 60,
  }),
  actions: {
    initialize(playersCount: number) {
      if(playersCount <= 0 || playersCount > 12) throw new Error('Too much players');
    },
    startGame() {
      if(this.players.length <= 3) throw new Error('Too few players in lobby');
    },
    finishRound() {
      if(this.players.some(x => x.points === this.maxScore)) {
        // Someone won the game
      }
    }
  }
})