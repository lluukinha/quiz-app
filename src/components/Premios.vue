<template>
  <div class="row justify-content-center mt-3 mb-3">
    <div
      class="ct_box col-md-8 rounded bg-dark text-center text-light pt-4 pb-4"
      v-if="allQuestionsAnsweredCorrectly"
    >
      <h1>PARABÉNS!</h1>
      <img :src="congratulationsImage" class="img-fluid mt-3 mb-3" />
      <h5>Chegamos ao fim! Mas você pode continuar clicando no botão abaixo.</h5>
      <button
        @click="$emit('restartGame')"
        class="btn btn-success"
      >
        INICIAR NOVAMENTE
      </button>
    </div>

    <div
      id="premiacao"
      class="ct_box col-md-8 rounded bg-dark text-center text-light"
      v-else
    >
      <h3 class="mt-3">PREMIAÇÃO</h3>

      <h5>Pergunta atual: {{ currentQuestionNumber }} - Valor: {{ premios[currentIndex].valor }}</h5>

      <div class="row mt-3 mb-3 justify-content-center">
        <div class="col-6 col-md-4">
          <template v-for="(premio, index) in premios">
            <p
              v-if="index < 4"
              :key="'premio_'+index"
              :class="currentIndex > index ? 'passou' : ''"
            >
              <span :class="currentIndex == index ? 'btn btn-warning btn-sm' : ''">
                <i v-show="currentIndex == index" class="fas fa-check-square"></i>
                {{premio.valor}}
              </span>
            </p>
          </template>
        </div>

        <div class="col-6 col-md-4">
          <template v-for="(premio,index) in premios">
            <p
              v-if="index > 3 && index < 8"
              :key="'premio_'+index"
              :class="currentIndex > index ? 'passou' : ''"
            >
              <span
                :class="currentIndex == index ? 'btn btn-warning btn-sm' : ''"
              >
                {{premio.valor}}
              </span>
            </p>
          </template>
        </div>

        <div class="col-6 col-md-4">
          <template v-for="(premio, index) in premios">
            <p
              v-if="index > 7"
              :key="'premio_'+index"
              :class="currentIndex > index ? 'passou' : ''"
            >
              <span :class="currentIndex == index ? 'btn btn-warning btn-sm' : ''">
                <i v-show="currentIndex == index" class="fas fa-check-square"></i>
                {{premio.valor}}
              </span>
            </p>
          </template>
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
export default {
  name: 'Premios',

  props: {
    currentIndex: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      images: [
        "https://media.giphy.com/media/26DOoDwdNGKAg6UKI/giphy.gif",
        "https://media.giphy.com/media/g9582DNuQppxC/giphy.gif",
        "https://media.giphy.com/media/fxsqOYnIMEefC/giphy.gif",
        "https://media.giphy.com/media/7rj2ZgttvgomY/giphy.gif"
      ],
      premios: [
        { id_pergunta: 0, valor: "R$1.000,00" },
        { id_pergunta: 1, valor: "R$2.000,00" },
        { id_pergunta: 2, valor: "R$5.000,00" },
        { id_pergunta: 3, valor: "R$10.000,00" },
        { id_pergunta: 4, valor: "R$25.000,00" },
        { id_pergunta: 5, valor: "R$50.000,00" },
        { id_pergunta: 6, valor: "R$100.000,00" },
        { id_pergunta: 7, valor: "R$200.000,00" },
        { id_pergunta: 8, valor: "R$300.000,00" },
        { id_pergunta: 9, valor: "R$400.000,00" },
        { id_pergunta: 10, valor: "R$500.000,00" },
        { id_pergunta: 11, valor: "R$1.000.000,00" }
      ]
    };
  },

  computed: {
    congratulationsImage() {
      return this.images[Math.floor(Math.random() * this.images.length)];
    },
    currentQuestionNumber() {
      return this.currentIndex + 1;
    },
    allQuestionsAnsweredCorrectly() {
      return this.currentIndex > 11;
    },
  },

};
</script>

<style>
.ct_box {
  box-shadow: 2px 3px 12px black;
}

.passou {
  text-decoration: line-through !important;
}
</style>
