<template>
  <transition name="bounceDown" mode="out-in">
    <div class="text-center mt-4" id="app" v-if="!isStarted">
      <h1>Bem vindo ao QUIZ</h1>
      <h4>RESPONDA TODAS AS PERGUNTAS CORRETAMENTE</h4>
      <button
        @click="startGame()"
        class="btn btn-dark btn-lg"
      >
        INICIAR
      </button>
    </div>

    <Game @restartGame="finishGame()" v-else />
</transition>
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
      isStarted: false
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
</style>