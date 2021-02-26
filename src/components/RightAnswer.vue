<template>
    <div class="text-center right-answer">

      <h1>RESPOSTA CORRETA!</h1>

      <h4>Você acertou em {{ time }} segundos!</h4>

      <img :src="successImage" class="img-fluid">

      <p class="text-center mt-2 mb-1">
        {{ explanation }}
      </p>

      <button
        class="btn btn-success"
        @click="$emit('goToNextQuestion')"
      >
        CONTINUAR
      </button>
    </div>
</template>

<script>
import gameImages from "../dados/images.json";

export default {
  name: 'RightAnswer',

  props: {
    explanation: {
      type: String,
      required: true,
    },
    timeInSeconds: {
      type: Number,
      required: true,
    },
  },

  computed: {
    successImage() {
      const imagesArray = gameImages.right;
      return imagesArray[Math.floor(Math.random() * imagesArray.length)];
    },
    time() {
      return 15 - this.timeInSeconds;
    },
  },
};
</script>

<style scoped>
.right-answer {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  padding: 20px;
  border-radius: 5px;
  background-color: #343a40;
  box-shadow: 2px 3px 12px black;
  color: white;
  z-index: 20;
  max-width: 600px !important;
}
</style>
