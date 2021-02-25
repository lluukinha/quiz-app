<template>
  <div class="row justify-content-center mt-3 mb-3">
    <GameFinished
      v-if="allQuestionsAnsweredCorrectly"
      @restartGame="$emit('restartGame')"
    />

    <div
      id="premiacao"
      class="ct_box col-md-8 rounded bg-dark text-center text-light"
      v-else
    >
      <h3 class="mt-3">PREMIAÇÃO</h3>

      <h5>{{ currentPrizeMessage }}</h5>

      <div class="row mt-3 mb-3 justify-content-center">
        <div class="col-6 col-md-4">
          <p
            v-for="prize in firstBarPrizes"
            :key="`premio_${prize.id}`"
            :class="currentIndex > prize.id ? 'passou' : ''"
          >
            <span :class="classForPrize(prize.id)">
              {{ prize.valor }}
            </span>
          </p>
        </div>

        <div class="col-6 col-md-4">
          <p
            v-for="prize in secondBarPrizes"
            :key="`premio_${prize.id}`"
            :class="currentIndex > prize.id ? 'passou' : ''"
          >
            <span :class="classForPrize(prize.id)">
              {{ prize.valor }}
            </span>
          </p>
        </div>

        <div class="col-6 col-md-4">
          <p
            v-for="prize in lastBarPrizes"
            :key="`premio_${prize.id}`"
            :class="currentIndex > prize.id ? 'passou' : ''"
          >
            <span :class="classForPrize(prize.id)">
              {{ prize.valor }}
            </span>
          </p>
        </div>

        <div class="col-12 mb-3">
          <button
            @click="$emit('continue')"
            class="btn btn-success"
          >
            CONTINUAR
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameFinished from './GameFinished.vue';

export default {
  name: 'Prizes',

  components: {
    GameFinished,
  },

  props: {
    currentIndex: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      premios: [
        { id: 0, valor: "R$1.000,00" },
        { id: 1, valor: "R$2.000,00" },
        { id: 2, valor: "R$5.000,00" },
        { id: 3, valor: "R$10.000,00" },
        { id: 4, valor: "R$25.000,00" },
        { id: 5, valor: "R$50.000,00" },
        { id: 6, valor: "R$100.000,00" },
        { id: 7, valor: "R$200.000,00" },
        { id: 8, valor: "R$300.000,00" },
        { id: 9, valor: "R$400.000,00" },
        { id: 10, valor: "R$500.000,00" },
        { id: 11, valor: "R$1.000.000,00" }
      ]
    };
  },

  computed: {
    firstBarPrizes() {
      return this.premios
        .filter(prize => prize.id < 4);
    },
    secondBarPrizes() {
      return this.premios
        .filter(prize => prize.id > 3 && prize.id < 8);
    },
    lastBarPrizes() {
      return this.premios
        .filter(prize => prize.id > 7);
    },
    currentQuestionNumber() {
      return this.currentIndex + 1;
    },
    allQuestionsAnsweredCorrectly() {
      return this.currentIndex > 11;
    },
    currentPrize() {
      return this.premios[this.currentIndex];
    },
    currentPrizeMessage() {
      return `Pergunta atual: ${this.currentQuestionNumber} - Valor: ${this.currentPrize.valor}`;
    },
  },

  methods: {
    classForPrize(prizeId) {
      if (this.currentIndex === prizeId) return 'btn btn-warning btn-sm';
      return '';
    },
  },

};
</script>

<style scoped>
.passou {
  text-decoration: line-through !important;
}
</style>
