<template>
  <div id="game_over" class="text-center">
    <h2 v-html="texto_motivo" class="mb-2"></h2>
    <!-- <i class="far fa-frown fa-5x text-warning"></i> -->
    <img :src="img_erro" class="img-fluid" />
    <h5 class="mb-4 mt-2">FIM DE JOGO</h5>
    <button @click="$emit('voltar_inicio')"
            class="btn btn-primary">VOLTAR AO INÍCIO</button>
  </div>
</template>

<script>
export default {
  props: ["motivo"],
  mounted() {
    this.carregar_motivo();
  },
  computed: {
    img_erro: function() {
      let array = this.imgs;
      return array[Math.floor(Math.random() * array.length)];
    }
  },
  data() {
    return {
      texto_motivo: "",
      imgs: ["https://media.giphy.com/media/1etprqF7hJtBDjZv1R/giphy.gif",
             "https://media.giphy.com/media/eKrgVyZ7zLvJrgZNZn/giphy.gif",
             "https://media.giphy.com/media/NxARrx3czdQaY/giphy.gif",
             "https://media.giphy.com/media/W5YVAfSttCqre/giphy.gif"],
    };
  },
  methods: {
    carregar_motivo() {
      if (this.motivo == "time") {
        this.texto_motivo = `<i class="fas fa-hourglass-end"></i> Ah não! O tempo acabou.`;
      }

      if (this.motivo == "answer") {
        this.texto_motivo = `<i class="fas fa-times-circle"></i> Ah não! Você errou!`;
      }
    }
  }
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
