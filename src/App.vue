<template>
  <div id="app" class="container">
    <transition name="bounceDown" mode="out-in">
      <div class="text-center mt-4" v-if="!isStarted">
        <div class="mb-4">
          <h1>{{ $t('home-title', { title: title }) }}</h1>
          <h4>{{ $t('home-subtitle') }}</h4>
          <h5>{{ $t('home-description') }}</h5>
        </div>
        <button @click="startGame()" class="btn btn-success btn-lg">
          {{ $t('common-start') }}
        </button>
      </div>
      <Game @restartGame="finishGame()" v-else />
    </transition>
  </div>
</template>

<script>
import Game from "./components/Game.vue";

export default {
  name: 'App',

  components: {
    Game,
  },

  data() {
    return {
      title: process.env.VUE_APP_TITLE,
      isStarted: false,
    };
  },

  methods: {
    startGame() {
      this.isStarted = true;
    },
    finishGame() {
      this.isStarted = false;
    },
  },
};
</script>

<style>
body {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(to right, rgb(15, 32, 39), rgb(32, 58, 67), rgb(44, 83, 100));
}

h1, h2, h3 {
    margin: 10px 0px;
    font-weight: 300;
}

#app {
  color: white;
}

.box {
  box-shadow: 2px 3px 12px black;
}
</style>