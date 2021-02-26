<template>
  <div class="container">
    <transition name="bounceDown" mode="out-in">
      <Prizes
        :currentIndex="currentIndex"
        v-if="!isGameRunning"
        @continue="continuePlaying()"
        @restartGame="restartGame()"
      />

      <Questions
        :currentQuestion="currentQuestion"
        v-if="isGameRunning"
        @goToNextQuestion="goToNextQuestion()"
        @restartGame="restartGame()"
      />
    </transition>
  </div>
</template>

<script>
import Prizes from "./Prizes.vue";
import Questions from "./Questions.vue";
import gameQuestions from "../dados/questions.json";

export default {
  name: 'Game',

  components: {
    Prizes,
    Questions,
  },

  data() {
    return {
      isGameRunning: false,
      currentIndex: 0,
    };
  },

  computed: {
    questions() {
      // This will return the questions shuffled
      const questions = gameQuestions.questions
        .map(question => ({ sort: Math.random(), value: question }))
        .sort((a, b) => a.sort - b.sort)
        .map(question => question.value);

      // Return 12 questions only
      return questions.slice(0, 12);
    },
    currentQuestion() {
      return this.questions[this.currentIndex];
    },
  },

  methods: {
    continuePlaying() {
      this.isGameRunning = true;
    },

    stopPlaying() {
      this.isGameRunning = false;
    },

    restartGame() {
      this.currentIndex = 0;
      this.$emit('restartGame');
    },

    goToNextQuestion() {
      // show prizes
      this.stopPlaying();
      // go to next question
      this.currentIndex += 1;
    },
  },
};
</script>

<style>
</style>
