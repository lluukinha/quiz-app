<template>
    <div class="text-center resposta-correta">

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

  data() {
    return {
      imgs: [
        "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
        "https://media.giphy.com/media/ckeHl52mNtoq87veET/giphy.gif",
        "https://media.giphy.com/media/DffShiJ47fPqM/giphy.gif",
        "https://media.giphy.com/media/1sv8xeMx3mG89zpZn7/giphy.gif"
      ],
    };
  },

  computed: {
    successImage() {
      return this.imgs[Math.floor(Math.random() * this.imgs.length)];
    },
    time() {
      return 15 - this.timeInSeconds;
    },
  },
};
</script>

<style scoped>
.resposta-correta {
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
