<template>
  <div class="container">
    <transition name="bounceDown" mode="out-in">
      <premios
        :atual="atual"
        v-if="!iniciar_jogo"
        v-on:iniciar_jogo="iniciar_jogo = $event"
        v-on:recomecar="voltar_inicio()"
      />
      <perguntas
        :atual="atual"
        v-if="iniciar_jogo"
        v-on:iniciar_jogo="iniciar_jogo = $event"
        v-on:continuar="atual ++"
        v-on:voltar_inicio="voltar_inicio()"
      />
    </transition>
  </div>
</template>

<script>
import premios from "./Premios.vue";
import perguntas from "./Perguntas.vue";

export default {
  components: {
    premios,
    perguntas,
  },

  data() {
    return {
      iniciar_jogo: false,
      atual: 0,
    };
  },

  methods: {
    voltar_inicio() {
      this.atual = 0;
      this.$emit('voltar_inicio');
    },
  },
};
</script>

<style>
</style>
