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
      <h3 class="mt-3">{{ $t('prizes') }}</h3>

      <h5>{{ currentPrizeMessage }}</h5>

      <div class="row mt-3 mb-3 justify-content-center">
        <div class="col-6 col-md-4">
          <p
            v-for="prize in firstBarPrizes"
            :key="`prize_${prize.id}`"
            :class="currentIndex > prize.id ? 'passed' : ''"
          >
            <span :class="classForPrize(prize.id)">
              {{ prize.value }}
            </span>
          </p>
        </div>

        <div class="col-6 col-md-4">
          <p
            v-for="prize in secondBarPrizes"
            :key="`prize_${prize.id}`"
            :class="currentIndex > prize.id ? 'passed' : ''"
          >
            <span :class="classForPrize(prize.id)">
              {{ prize.value }}
            </span>
          </p>
        </div>

        <div class="col-6 col-md-4">
          <p
            v-for="prize in lastBarPrizes"
            :key="`prize_${prize.id}`"
            :class="currentIndex > prize.id ? 'passed' : ''"
          >
            <span :class="classForPrize(prize.id)">
              {{ prize.value }}
            </span>
          </p>
        </div>

        <div class="col-12 mb-3">
          <button
            @click="$emit('continue')"
            class="btn btn-success"
          >
            {{ $t('common-continue') }}
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
      prizes: [
        { id: 0, value: 1000 },
        { id: 1, value: 2000 },
        { id: 2, value: 5000 },
        { id: 3, value: 10000 },
        { id: 4, value: 25000 },
        { id: 5, value: 50000 },
        { id: 6, value: 100000 },
        { id: 7, value: 200000 },
        { id: 8, value: 300000 },
        { id: 9, value: 400000 },
        { id: 10, value: 500000 },
        { id: 11, value: 1000000 }
      ]
    };
  },

  computed: {
    formattedPrizes() {
      const currencyData = { style: "currency", currency: "BRL" };

      return this.prizes
        .map((prize) => {
          return {
            id: prize.id,
            value: prize.value.toLocaleString("pt-BR", currencyData),
          };
        });
    },

    firstBarPrizes() {
      return this.formattedPrizes
        .filter(prize => prize.id < 4);
    },

    secondBarPrizes() {
      return this.formattedPrizes
        .filter(prize => prize.id > 3 && prize.id < 8);
    },

    lastBarPrizes() {
      return this.formattedPrizes
        .filter(prize => prize.id > 7);
    },

    currentQuestionNumber() {
      return this.currentIndex + 1;
    },

    allQuestionsAnsweredCorrectly() {
      return this.currentIndex > 11;
    },

    currentPrize() {
      return this.formattedPrizes[this.currentIndex];
    },

    currentPrizeMessage() {
      const variables = {
        questionNumber: this.currentQuestionNumber,
        value: this.currentPrize.value,
      };
      return this.$t('prizes-current-question', variables);
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
.passed {
  text-decoration: line-through !important;
}
</style>
