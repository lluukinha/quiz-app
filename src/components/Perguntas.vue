<template>
  <div>
    <transition name="bounce">
      <GameOver
        v-if="isGameOver"
        :reason="gameOverReason"
        @restartGame="$emit('restartGame')"
      />

      <RespostaCorreta
        v-if="acertou && !isGameOver"
        :timeInSeconds="timeInSeconds"
        :explanation="currentQuestion.explicacao"
        @goToNextQuestion="$emit('goToNextQuestion')"
      />
    </transition>

    <div class="row justify-content-center mt-3">
      <div class="tempo col-md-8 text-center mb-3">
        {{ timeInSeconds }}
      </div>

      <div class="box-question col-md-8 pt-3 pb-3 text-center text-dark">
        <h5>PERGUNTA:</h5>
        <h2>{{ currentQuestion.pergunta }}</h2>
      </div>

      <div class="col-md-8 mt-3">
        <ul class="list-group text-dark">
          <li
            v-for="(resposta, index) in currentQuestion.respostas"
            @click="answerClicked(index)"
            :key="`answer_${index}`"
            class="list-group-item"
            :class="getClassesForAlternatives(index)"
          >
            {{ resposta }}
          </li>
        </ul>

        <button
          class="btn btn-success btn-lg mt-3 btn-block"
          @click="checkForCorrectAnswer()"
          :class="disableContinueButton ? 'disabled' : ''"
          :disabled="disableContinueButton"
        >
          CONTINUAR
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import GameOver from "./GameOver.vue";
import RespostaCorreta from "./RespostaCorreta.vue";

export default {
  name: 'Perguntas',

  components: {
    GameOver,
    RespostaCorreta,
  },

  props: {
    currentQuestion: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    this.timeCount();
  },

  data() {
    return {
      timeInSeconds: 15,
      acertou: false,
      isGameOver: false,
      gameOverReason: '',
      resposta_marcada: false,
      chosenIndex: null,
    };
  },

  computed: {
    disableContinueButton() {
      return this.chosenIndex === null
        || this.isGameOver
        || this.acertou;
    },
  },

  methods: {
    timeCount() {
      if (this.timeInSeconds > 0 && !this.acertou) {
        setTimeout(() => {
          this.timeInSeconds -= 1;
          this.timeCount();
        }, 1000);
      }

      if (this.timeInSeconds == 0) {
        this.isGameOver = true;
        this.gameOverReason = 'time';
      }
    },

    checkForCorrectAnswer() {
      const rightIndex = this.currentQuestion.correta;

      if (this.chosenIndex === rightIndex) {
        this.acertou = true;
      } else {
        this.isGameOver = true;
        this.gameOverReason = 'answer';
      }
    },

    answerClicked(index) {
      if (this.acertou || this.isGameOver) return;
      this.chosenIndex = index;
    },

    getClassesForAlternatives(index) {
      const isChecked = this.chosenIndex !== null && this.chosenIndex == index;
      return {
        disabled: this.isGameOver,
        'list-group-item-success': isChecked
      };
    },
  },
};
</script>

<style scoped>
.tempo {
  font-size: 3rem;
  color: #ffffff;
  font-weight: bold;
}

.box-question {
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 4px 12px black;
}
</style>
