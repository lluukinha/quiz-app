<template>
  <div id="game_over" class="text-center">
    <h2 v-html="textoMotivo" class="mb-2" />
    <img :src="imgErro" class="img-fluid" />
    <h5 class="mb-4 mt-2">FIM DE JOGO</h5>
    <button
      @click="$emit('voltar_inicio')"
      class="btn btn-primary"
    >
      VOLTAR AO INÍCIO
    </button>
  </div>
</template>

<script>
export default {
  props: {
    motivo: {
      type: String,
    },
  },

  mounted() {
    this.carregar_motivo();
  },

  computed: {
    imgErro() {
      let array = this.imgs;
      return array[Math.floor(Math.random() * array.length)];
    },
    textoMotivo() {
      if (this.motivo === 'time') return 'Ah não! O tempo acabou.';
      if (this.motivo == "answer") return 'Ah não! Você errou!';
      return '';
    },
  },

  data() {
    return {
      texto_motivo: '',
      imgs: [
        'https://media.giphy.com/media/1etprqF7hJtBDjZv1R/giphy.gif',
        'https://media.giphy.com/media/eKrgVyZ7zLvJrgZNZn/giphy.gif',
        'https://media.giphy.com/media/NxARrx3czdQaY/giphy.gif',
        'https://media.giphy.com/media/W5YVAfSttCqre/giphy.gif'
      ],
    };
  },
};
</script>

<style>
#game_over {
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
