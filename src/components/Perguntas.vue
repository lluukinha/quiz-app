<template>
  <div>
    <transition name="bounce">
      <game-over
        v-if="game_over"
        :motivo="motivo_gameover"
        v-on:voltar_inicio="$emit('voltar_inicio')"
      />
      <resposta-correta
        v-if="acertou && !game_over"
        :tempo="tempo"
        :explicacao="perguntas[atual].explicacao"
        v-on:continuar="$emit('continuar')"
        v-on:iniciar_jogo="$emit('iniciar_jogo',false)"
      />
    </transition>
    <div class="row justify-content-center mt-3">
      <div class="tempo col-md-8 text-center mb-3">{{ tempo }}</div>
      <div class="box-question col-md-8 pt-3 pb-3 text-center text-dark">
        <h5>PERGUNTA:</h5>
        <h2>{{ perguntas[atual].pergunta }}</h2>
      </div>

      <div class="col-md-8 mt-3">
        <ul class="list-group text-dark">
          <li
            v-for="(r,i) in perguntas[atual].respostas"
            @click="!acertou && !game_over ? marcar_resposta(i) : ''"
            :key="'resposta_' + atual + '_' + i"
            class="list-group-item"
            :class="{ disabled: game_over, 'list-group-item-success' : resposta_marcada && number_checked == i}"
          >{{ r }}</li>
        </ul>
        <button
          class="btn btn-success btn-lg mt-3 btn-block"
          @click="resposta_marcada ? check_resposta(number_checked,perguntas[atual].correta) : ''"
          :class="!resposta_marcada || game_over ? 'disabled' : ''"
        >CONTINUAR</button>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import GameOver from "./GameOver.vue";
import RespostaCorreta from "./RespostaCorreta.vue";
import doc from "../dados/perguntas.json";
export default {
  components: { GameOver, RespostaCorreta },
  props: ["atual"],
  mounted() {
    this.contar_tempo();
  },
  data() {
    return {
      tempo: 15,
      acertou: false,
      game_over: false,
      motivo_gameover: "",
      resposta_marcada: false,
      number_checked: "",
      perguntas: doc.questions
    };
  },
  methods: {
    contar_tempo() {
      if (this.tempo > 0 && !this.acertou) {
        setTimeout(() => {
          this.tempo--;
          this.contar_tempo();
        }, 1000);
      }

      if (this.tempo == 0) {
        this.game_over = true;
        this.motivo_gameover = "time";
      }
    },
    check_resposta(clicada, correta) {
      if (clicada == correta) {
        this.acertou = true;
      } else {
        this.game_over = true;
        this.motivo_gameover = "answer";
      }
    },
    marcar_resposta(numero) {
      this.number_checked = numero;
      this.resposta_marcada = true;
    }
  }
};
</script>

<style>
.tempo {
  font-size: 3rem;
  color: #ffffff;
  font-weight: bold;
}

.box-question {
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 4px 12px black;
}
</style>
