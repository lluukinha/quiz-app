<template>
<transition name="bounceDown" mode="out-in">
  <div class="text-center mt-4" 
       id="app" v-if="!iniciar">
    <h1>Bem vindo ao QUIZ</h1>
    <h4>RESPONDA TODAS AS PERGUNTAS CORRETAMENTE</h4>
    <button @click="iniciar = true" 
            class="btn btn-dark btn-lg">INICIAR</button>
  </div>
  <game v-on:voltar_inicio="iniciar = false" 
        v-else />
</transition>
</template>

<script>
import game from "./components/Game.vue";

export default {
  data() {
    return {
      iniciar: false
    };
  },
  components: { game }
};
</script>

<style>
#app {
  color: white;
}
</style>