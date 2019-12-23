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
        <v-card-title style="color: #53565a" class="pb-0">Cadastro de Núcleo</v-card-title>
        <v-card-text>
          <div class="EmptyBox10" />
          <v-text-field
            outlined
            clearable
            dense
            id="sigla"
            label="Sigla"
            name="sigla"
            type="text"
            :rules="rules"
            v-model="sigla"
          />
          <v-text-field
            outlined
            clearable
            dense
            id="descricao"
            label="Descrição"
            name="descricao"
            type="text"
            :rules="rules"
            v-model="descricao"
          />
          <v-select
            dense
            :items="gestores"
            v-model="gestor"
            :rules="rules"
            item-text="pesdescri"
            item-value="pessequen"
            label="Gestor"
            outlined
          ></v-select>
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
import { NucleoService } from "../services/NucleoService";
import { PessoaService } from "../services/PessoaService";
export default {
  data() {
    return {
      id: null,
      sigla: "",
      descricao: "",
      gestor: null,
      gestores: [],
      error: null,
      showSuces: false,
      showError: false,
      dialog: false,
      rules: [value => !!value || "Campo Obrigatório."],
      nucleoService: new NucleoService(),
      pessoaService: new PessoaService()
    };
  },
  async mounted() {
    await this.getGestores();
    if (this.$route.params.id !== null && this.$route.params.id !== undefined) {
      this.id = this.$route.params.id;
      await this.getById();
    }
  },
  methods: {
    getGestores: async function() {
      this.pessoaService
        .getByPerfil(2)
        .then(response => (this.gestores = response.data))
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
    },
    getById: async function() {
      await this.nucleoService
        .getById(this.id)
        .then(response => {
          let nucleo = response.data;

          this.sigla = nucleo.nucsiglaa;
          this.descricao = nucleo.nucdescri;
          this.gestor = nucleo.idGestor;
        })
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
    },
    save: async function() {
      if (this.id !== null && this.id !== undefined) {
        await this.nucleoService
          .update({
            id: this.id,
            nucsiglaa: this.sigla,
            nucdescri: this.descricao,
            nucgesseq: this.gestor
          })
          .then(() => {
            this.showSuces = true;
          })
          .catch(error => {
            this.error = error;
            this.showError = true;
          });
      } else {
        await this.nucleoService
          .save({
            nucsiglaa: this.sigla,
            nucdescri: this.descricao,
            nucgesseq: this.gestor
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
      await this.nucleoService
        .remove(this.id)
        .then(() => {
          this.$router.push("/restrito/nucleo");
        })
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
    },
    back: function() {
      this.$router.push("/restrito/nucleo");
    }
  }
};
</script>