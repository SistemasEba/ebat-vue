<template>
  <v-content>
    <v-container fluid>
      <v-alert
        :value="showSuces"
        type="success"
        dark
        prominent
        dense
        border="left"
        icon="mdi-check"
        transition="scale-transition"
      >Operação realizada com sucesso!</v-alert>
      <v-alert
        :value="showError"
        type="error"
        dark
        prominent
        dense
        border="left"
        icon="mdi-close"
        transition="scale-transition"
      >{{error}}</v-alert>
      <v-card outlined>
        <v-card-title style="color: #53565a" class="pb-0">Cadastro de Tipo</v-card-title>
        <v-card-text>
          <div class="EmptyBox10" />
          <v-text-field
            outlined
            clearable
            dense
            id="nome"
            label="Nome"
            name="nome"
            type="text"
            :rules="rules"
            v-model="nome"
          />
          <v-select
            dense
            :items="informacoes"
            v-model="informacao"
            :rules="rules"
            item-text="label"
            item-value="value"
            label="Informação"
            outlined
          ></v-select>
          <v-text-field
            outlined
            clearable
            dense
            id="posicao"
            label="Posição"
            name="posicao"
            type="number"
            :rules="rules"
            v-model="posicao"
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn small depressed outlined class="ma-2" color="warning" v-on:click="back">
            <v-icon left>mdi-arrow-left</v-icon>Voltar
          </v-btn>
          <v-btn small depressed outlined class="ma-2" color="warning" v-on:click="save">
            <v-icon left>mdi-content-save</v-icon>Salvar
          </v-btn>
          <v-btn
            small
            depressed
            outlined
            class="ma-2"
            color="red"
            dark
            @click.stop="dialog = true"
            v-if="this.id !== null && this.id !== undefined"
          >
            <v-icon left>mdi-close</v-icon>Remover
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-dialog v-model="dialog" max-width="320">
      <v-card>
        <v-card-title class="headline">Confirmação</v-card-title>
        <v-card-text>Realmente deseja remover esse registro?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange darken-1" text v-on:click="dialog = false">Não</v-btn>
          <v-btn color="orange darken-1" text v-on:click="remove">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import { TipoService } from "../services/TipoService";
export default {
  data() {
    return {
      id: null,
      nome: "",
      posicao: "",
      informacao: "",
      informacoes: [
        { value: "1", label: "Projeto" },
        { value: "2", label: "Etapa" },
        { value: "3", label: "Andamento" }
      ],
      error: null,
      showSuces: false,
      showError: false,
      dialog: false,
      rules: [value => !!value || "Campo Obrigatório."],
      tipoService: new TipoService()
    };
  },
  mounted() {
    if (this.$route.params.id !== null && this.$route.params.id !== undefined) {
      this.id = this.$route.params.id;
      this.getById();
    }
  },
  methods: {
    getById: async function() {
      await this.tipoService
        .getById(this.id)
        .then(response => {
          let tipo = response.data;

          this.nome = tipo.tipdescri;
          this.informacao = tipo.tipinform;
          this.posicao = tipo.tipposica;
        })
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
    },
    back: function() {
      this.$router.push("/restrito/tipo");
    },
    save: async function() {
      if (this.id !== null && this.id !== undefined) {
        await this.tipoService
          .update({
            id: this.id,
            tipdescri: this.nome,
            tipinform: this.informacao,
            tipposica: this.posicao
          })
          .then(() => {
            this.showSuces = true;
          })
          .catch(error => {
            this.error = error;
            this.showError = true;
          });
      } else {
        await this.tipoService
          .save({
            tipdescri: this.nome,
            tipinform: this.informacao,
            tipposica: this.posicao
          })
          .then(() => {
            this.showSuces = true;
          })
          .catch(error => {
            this.error = error;
            this.showError = true;
          });
      }
    },
    remove: async function() {
      this.dialog = false;
      await this.tipoService
        .remove(this.id)
        .then(() => {
          this.$router.push("/restrito/tipo");
        })
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
    },
  }
};
</script>