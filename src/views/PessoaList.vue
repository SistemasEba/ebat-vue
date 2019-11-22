<template>
  <v-content>
    <v-container fluid>
      <v-btn color="orange" small dark v-on:click="goToForm">
        <v-icon>mdi-plus</v-icon>Adicionar
      </v-btn>
      <div class="EmptyBox10"></div>
      <v-card outlined>
      <v-card-title style="color: #53565a">
        Pessoas
        <v-spacer></v-spacer>
        <v-text-field dense outlined clearable v-model="search" append-icon="mdi-magnify" label="Procurar" class="Fs13" color="orange" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table dense 
        class="elevation-0"
        :headers="headers"
        :items="pessoas"
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
import { PessoaService } from "../services/PessoaService";
export default {
  data() {
    return {
      headers: [
        { text: "Sigla", value: "pessiglaa" },
        { text: "Nome", value: "pesdescri" },
        { text: "Perfil", value: "pesperfil" }
      ],
      search: "",
      pessoas: [],
      pessoaService: new PessoaService()
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load: async function() {
      await this.pessoaService
        .getAll()
        .then(response => {
          for (let i in response.data) {
            switch (response.data[i].pesperfil) {
              case 2:
                response.data[i].pesperfil = "Gestor";
                break;
              case 3:
                response.data[i].pesperfil = "Sistemas";
                break;
              case 4:
                response.data[i].pesperfil = "Master";
                break;
              case 5:
                response.data[i].pesperfil = "Outros";
                break;
              case 6:
                response.data[i].pesperfil = "Solicitante";
                break;
              default:
                response.data[i].pesperfil = "Desenvolvedor";
                break;
            }
          }
          this.pessoas = response.data;
        })
        .catch(error => window.console.log(error));
    },
    goToForm: function() {
      this.$router.push("/restrito/pessoa/form");
    }
  }
};
</script>