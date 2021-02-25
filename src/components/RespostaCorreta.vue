<template>
    <div id="resposta_correta" class="text-center">
      <h1>RESPOSTA CORRETA!</h1>
      <h4>Você acertou em {{ time }} segundos!</h4>
      <img :src="img_correta" class="img-fluid">
      <p class="text-justify mt-2 mb-1">{{ explicacao }}</p>

      <button
        class="btn btn-success"
        @click="continuar()"
      >
        PRÓXIMA PERGUNTA
      </button>
    </div>
</template>

<script>
export default {
  props: ["explicacao", "tempo"],

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

  methods: {
    continuar() {
      this.$emit("continuar");
      this.$emit("iniciar_jogo", false);
    }
  },

  computed: {
    img_correta: function() {
      let array = this.imgs;
      return array[Math.floor(Math.random() * array.length)];
    },
    time: function() {
      return 15 - this.tempo;
    },
  },
};
</script>

<style>
#resposta_correta {
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
