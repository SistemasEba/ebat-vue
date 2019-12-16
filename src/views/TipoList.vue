<template>
  <v-content>
    <v-container fluid>
      <v-btn small color="primary" dark v-on:click="goToForm">
        <v-icon>mdi-plus</v-icon>Adicionar
      </v-btn>
      <div class="EmptyBox10"></div>
      <v-card outlined>
      <v-card-title style="color: #53565a">
        Tipos
        <v-spacer></v-spacer>
        <v-text-field dense outlined clearable v-model="search" append-icon="mdi-magnify" label="Procurar" class="Fs13" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table dense 
        v-model="selected"
        no-data-text="Nenhum registro encontrado"
        no-results-text="Nenhum registro encontrado"
        class="elevation-0"
        @click:row="select"
        :headers="headers"
        :items="tipos"
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
import { TipoService } from "../services/TipoService";

export default {
  data() {
    return {
      selected: [],
      headers: [
        { text: "Informação", value: "tipinform", width: "15%", align: "center" },
        { text: "Descrição", value: "tipdescri", align: "center" },
      ],
      search: "",
      tipos: [],
      tipoService: new TipoService()
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load: async function() {
      this.tipoService
        .getAll()
        .then(response => {
          for (let i in response.data) {
            switch (response.data[i].tipinform) {
              case "2":
                response.data[i].tipinform = "Etapa";
                break;
              case "3":
                response.data[i].tipinform = "Andamento";
                break;
              default:
                response.data[i].tipinform = "Projeto";
                break;
            }
          }
          this.tipos = response.data;
        })
        .catch(error => alert(error));
    },
    goToForm: function() {
      this.$router.push("/restrito/tipo/form");
    },
    select: function(item) {
      this.$router.push("/restrito/tipo/form/" + item.tipsequen);
    }
  }
};
</script>