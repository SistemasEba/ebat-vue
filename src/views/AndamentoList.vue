<template>
  <v-content>
    <v-container fluid>
      <v-btn small depressed outlined color="primary" v-on:click="goToEtapas">
        <v-icon>mdi-arrow-left</v-icon>Voltar
      </v-btn>
      <v-btn small depressed outlined color="primary" class="ma-2" v-on:click="goToForm">
        <v-icon>mdi-plus</v-icon>Adicionar
      </v-btn>
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
        <v-card-title style="color: #53565a" class="pb-0">
          Andamentos de {{etapaBody.etpdescri}} do projeto {{projetoBody.pjttitulo}}
          <v-spacer></v-spacer>
          <v-text-field
            dense
            outlined
            clearable
            v-model="search"
            append-icon="mdi-magnify"
            label="Procurar"
            class="Fs13"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          dense
          v-model="selected"
          @click:row="select"
          no-data-text="Nenhum registro encontrado"
          no-results-text="Nenhum registro encontrado"
          class="elevation-0"
          :headers="headers"
          :items="andamentos"
          :items-per-page="10"
          :search="search"
          :footer-props="{
            'items-per-page-text': 'Linhas por página:',
            'items-per-page-all-text': 'Tudo'
        }"
        ></v-data-table>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import { ProjetoService } from "../services/ProjetoService";
import { EtapaService } from "../services/EtapaService";
import { AndamentoService } from "../services/AndamentoService";
export default {
  data() {
    return {
      andamentos: [],
      projeto: null,
      projetoBody: {},
      etapa: null,
      etapaBody: {},
      showSuces: false,
      showError: false,
      selected: [],
      headers: [
        { text: "Data", value: "anddatand", align: "center", width: "10%" },
        { text: "H.Gastas", value: "andhorass", align: "center", width: "10%" },
        {
          text: "Responsável",
          value: "andresseq.pesdescri",
          align: "center",
          width: "20%"
        },
        {
          text: "Tipo",
          value: "andtipseq.tipdescri",
          align: "center",
          width: "15%"
        },
        { text: "Descrição", value: "anddescri", align: "center" }
      ],
      error: null,
      search: "",
      projetoService: new ProjetoService(),
      etapaService: new EtapaService(),
      andamentoService: new AndamentoService()
    };
  },
  async mounted() {
    this.projeto = this.$route.params.projeto;
    this.etapa = this.$route.params.etapa;
    await this.getProjetoById();
    await this.getEtapaById();
    await this.load();
  },
  methods: {
    select: function(item) {
      this.$router.push("/restrito/andamento/" + this.projeto + "/" + this.etapa + "/form/" + item.andsequen);
    },
    load: async function() {
      await this.andamentoService
        .getAllByEtapa(this.etapa)
        .then(response => {
          let registros = response.data;

          registros.forEach(element => {
            let data = new Date(element.anddatand);
            data.setDate(data.getDate() + 1);
            element.anddatand = data.toLocaleDateString();
          });

          this.andamentos = registros;
        })
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
    },
    getProjetoById: async function() {
      await this.projetoService
        .getById(this.projeto)
        .then(response => (this.projetoBody = response.data))
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
    },
    getEtapaById: async function() {
      await this.etapaService
        .getById(this.etapa)
        .then(response => (this.etapaBody = response.data))
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
    },
    goToForm: function() {
      this.$router.push("/restrito/andamento/" + this.projeto + "/" + this.etapa + "/form");
    },
    goToEtapas: function() {
      this.$router.push("/restrito/etapa/" + this.projeto);
    },
  }
};
</script>