<template>
  <v-content>
    <v-container fluid>
      <v-btn small depressed outlined color="primary" v-on:click="goToForm">
        <v-icon>mdi-plus</v-icon>Adicionar
      </v-btn>
      <div class="EmptyBox10"></div>
      <v-card outlined>
        <v-card-title style="color: #53565a">
          Núcleos
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
          no-data-text="Nenhum registro encontrado"
          no-results-text="Nenhum registro encontrado"
          class="elevation-0"
          @click:row="select"
          :headers="headers"
          :items="nucelos"
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
import { NucleoService } from "../services/NucleoService";
export default {
  data() {
    return {
      selected: [],
      headers: [
        { text: "Sigla", value: "nucsiglaa", align: "center", width: "10%" },
        { text: "Descrição", value: "nucdescri", align: "center" },
        { text: "Gestor", value: "nomeGestor", align: "center", width: "30%" }
      ],
      search: "",
      nucelos: [],
      nucleoService: new NucleoService()
    };
  },
  created() {
    this.load();
  },
  methods: {
    load: async function() {
      await this.nucleoService
        .getAll()
        .then(response => (this.nucelos = response.data))
        .catch(error => alert(error));
    },
    goToForm: function() {
      this.$router.push("/restrito/nucleo/form");
    },
    select: function(item) {
      this.$router.push("/restrito/nucleo/form/" + item.nucsequen);
    }
  }
};
</script>