<template>
  <v-content>
    <v-container fluid>
      <v-btn color="orange" small depressed dark>
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
                <h4 style="color: #53565a">{{ item.pjttitulo }}</h4>
              </v-card-title>
              <v-card-text>
                  <v-btn class="ma-2" fab x-small depressed color="#f4f4f4">{{ item.qtdEtapas }}</v-btn> {{ item.pjtdescri }}
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
  }
};
</script>