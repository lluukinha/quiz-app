<template>
  <div>
    <transition name="bounce">
      <GameOver
        :reason="gameOverReason"
        :currentQuestion="currentQuestion"
        @restartGame="$emit('restartGame')"
        v-if="isGameOver"
      />

      <RightAnswer
        :timeInSeconds="timeInSeconds"
        :explanation="currentQuestion.explanation"
        @goToNextQuestion="$emit('goToNextQuestion')"
        v-if="isRight && !isGameOver"
      />
    </transition>

    <div class="row justify-content-center mt-3">
      <div class="time col-md-8 text-center mb-3">
        {{ timeInSeconds }}
      </div>

      <div class="box-question col-md-8 pt-3 pb-3 text-center text-dark">
        <h5>{{ $t('common-question') }}:</h5>
        <h2>{{ currentQuestion.question }}</h2>
      </div>

      <div class="col-md-8 mt-3">
        <ul class="list-group text-dark">
          <li
            v-for="(alternative, index) in alternatives"
            @click="answerClicked(index)"
            :key="`answer_${index}`"
            class="list-group-item"
            :class="getClassesForAlternatives(index)"
          >
            {{ alternative }}
          </li>
        </ul>

        <div class="d-flex justify-space-around">
          <button
            class="btn btn-dark btn-lg mt-3 btn-block"
            :class="cantJumpQuestion ? 'disabled' : ''"
            :disabled="cantJumpQuestion"
            @click="jumpQuestion()"
          >
            {{ $t('common-jump') }}
            <span class="small">({{ jumps }})</span>
          </button>

          <button
            class="btn btn-success btn-lg mt-3 btn-block"
            :class="disableContinueButton ? 'disabled' : ''"
            :disabled="disableContinueButton"
            @click="checkForCorrectAnswer()"
          >
            {{ $t('common-continue') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import GameOver from "./GameOver.vue";
import RightAnswer from "./RightAnswer.vue";

export default {
  name: 'Questions',

  components: {
    GameOver,
    RightAnswer,
  },

  props: {
    currentQuestion: {
      type: Object,
      required: true,
    },
    jumps: {
      type: Number,
      required: true,
    },
  },

  mounted() {
    this.timeCount();
  },

  data() {
    return {
      timeInSeconds: 15,
      isRight: false,
      isGameOver: false,
      gameOverReason: '',
      chosenIndex: null,
    };
  },

  computed: {
    cantJumpQuestion() {
      return this.jumps === 0
        || this.isGameOver
        || this.isRight;
    },

    disableContinueButton() {
      return this.chosenIndex === null
        || this.isGameOver
        || this.isRight;
    },

    alternatives() {
      // This will return the alternatives shuffled
      return this.currentQuestion.alternatives
        .map(alternative => ({ sort: Math.random(), value: alternative }))
        .sort((a, b) => a.sort - b.sort)
        .map(alternative => alternative.value);
    },
  },

  methods: {
    timeOut() {
      this.isGameOver = true;
      this.gameOverReason = 'time';
    },

    jumpQuestion() {
      if (this.cantJumpQuestion) return;
      this.timeInSeconds = 15;
      this.$emit('jump');
    },

    wrongAnswer() {
      this.isGameOver = true;
      this.gameOverReason = 'answer';
    },

    timeCount() {
      if (this.timeInSeconds > 0 && !this.isRight) {
        setTimeout(() => {
          this.timeInSeconds -= 1;
          this.timeCount();
        }, 1000);
      }

      if (this.timeInSeconds == 0 && !this.isGameOver) this.timeOut();
    },

    checkForCorrectAnswer() {
      const rightAnswer = this.currentQuestion.rightAnswer;
      const chosenAnswer = this.alternatives[this.chosenIndex];

      if (chosenAnswer === rightAnswer) {
        this.isRight = true;
      } else {
        this.wrongAnswer();
      }
    },

    answerClicked(index) {
      if (this.isRight || this.isGameOver) return;
      this.chosenIndex = index;
    },

    getClassesForAlternatives(index) {
      const isClicked = this.chosenIndex !== null && this.chosenIndex == index;
      return {
        disabled: this.isGameOver,
        'list-group-item-success': isClicked
      };
    },
  },
};
</script>

<style scoped>
.time {
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
