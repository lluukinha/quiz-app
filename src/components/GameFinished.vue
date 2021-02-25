<template>
  <div class="box col-md-8 rounded bg-dark text-center text-light pt-4 pb-4">
    <h1>PARABÉNS!</h1>

    <img :src="congratulationsImage" class="img-fluid mt-3 mb-3" />

    <h5>
      Chegamos ao fim! Mas você pode começar novamente clicando no botão abaixo.
    </h5>

    <button @click="$emit('restartGame')" class="btn btn-success">
      INICIAR NOVAMENTE
    </button>
    </div>
</template>

<script>
export default {
  name: 'GameFinished',

  data() {
    return {
      images: [
        'https://media.giphy.com/media/26DOoDwdNGKAg6UKI/giphy.gif',
        'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif',
        'https://media.giphy.com/media/fxsqOYnIMEefC/giphy.gif',
        'https://media.giphy.com/media/7rj2ZgttvgomY/giphy.gif'
      ],
    };
  },

  computed: {
    congratulationsImage() {
      return this.images[Math.floor(Math.random() * this.images.length)];
    },
  },
}
</script>

<style scoped>
.box {
  box-shadow: 2px 3px 12px black;
}
</style>
