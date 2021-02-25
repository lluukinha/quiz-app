<template>
  <div class="text-center game-over">
    <h2 v-html="gameOverReason" class="mb-2" />
    <img :src="errorImage" class="img-fluid" />
    <h5 class="mb-4 mt-2">FIM DE JOGO</h5>
    <button
      @click="$emit('restartGame')"
      class="btn btn-primary"
    >
      VOLTAR AO INÍCIO
    </button>
  </div>
</template>

<script>
import gameImages from "../dados/images.json";

export default {
  name: 'GameOver',

  props: {
    reason: {
      type: String,
      required: true,
    },
  },

  computed: {
    errorImage() {
      const imagesArray = gameImages.wrong;
      return imagesArray[Math.floor(Math.random() * imagesArray.length)];
    },
    gameOverReason() {
      if (this.reason === 'time') return 'Ah não! O tempo acabou.';
      if (this.reason === 'answer') return 'Ah não! Você errou!';
      return '';
    },
  },
};
</script>

<style scoped>
.game-over {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  padding: 20px;
  border-radius: 5px;
  background-color: #343a40;
  color: white;
  z-index: 20;
  max-width: 600px !important;
  box-shadow: 2px 3px 12px black;
}
</style>
