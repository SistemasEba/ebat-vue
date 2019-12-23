<template>
  <v-content>
    <v-container fluid>
      <v-btn color="orange" small depressed outlined v-on:click="goToForm">
        <v-icon>mdi-plus</v-icon>Adicionar
      </v-btn>
      <v-data-iterator
        :items="items"
        item-key="pjtsequen"
        :items-per-page="4"
        no-data-text="Carregando..."
        no-results-text="Nenhum projeto encontrado"
        hide-default-footer
      >
        <v-row>
          <v-col v-for="item in items" :key="item.name" cols="12" sm="6" md="4" lg="3">
            <v-card>
              <v-card-title>
                <a
                  :href="'/#/restrito/projeto/form/' + item.pjtsequen"
                  style="text-decoration: none"
                >
                  <h4 style="color: #53565a">{{ item.pjttitulo }}</h4>
                </a>
              </v-card-title>
              <v-card-text>
                <v-btn
                  :title="'Acessar etapas de ' + item.pjttitulo"
                  class="ma-2"
                  fab
                  x-small
                  depressed
                  color="#f4f4f4"
                  v-on:click="goToEtapas(item.pjtsequen)"
                >{{ item.qtdEtapas }}</v-btn>
                {{ item.pjtdescri }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-data-iterator>
    </v-container>
  </v-content>
</template>

<script>
import { ProjetoService } from "../services/ProjetoService";
export default {
  data() {
    return {
      items: [],
      projetoService: new ProjetoService()
    };
  },
  created() {
    this.projetoService
      .getAll()
      .then(response => (this.items = response.data))
      .catch(error => alert(error));
  },
  methods: {
    goToForm: function() {
      this.$router.push("/restrito/projeto/form");
    },
    goToEtapas: function(idProjeto) {
      this.$router.push("/restrito/etapa/" + idProjeto);
    }
  }
};
</script>