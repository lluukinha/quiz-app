<template>
  <div class="box col-md-8 rounded bg-dark text-center text-light pt-4 pb-4">
    <h1>{{ $t('lastpage-congratulations') }}</h1>

    <img class="img-fluid mt-3 mb-3" :src="congratulationsImage" />

    <h5>{{ $t('lastpage-message') }}</h5>

    <button @click="$emit('restartGame')" class="btn btn-success">
      {{ $t('common-start-again') }}
    </button>
  </div>
</template>

<script>
import gameImages from "../dados/images.json";

export default {
  name: 'GameFinished',

  computed: {
    congratulationsImage() {
      const imagesArray = gameImages.right;
      const image = imagesArray[Math.floor(Math.random() * imagesArray.length)];
      return require(`../assets/images/right/${image}`);
    },
  },
}
</script>

<style>
</style>
