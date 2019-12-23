<template>
  <v-content>
    <v-container fluid>
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6" md="2">
              <v-menu
                ref="menu1"
                color="orange"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    color="orange"
                    dense
                    hide-details
                    outlined
                    v-model="dateFormatted"
                    label="Data Inicial"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="orange"
                  locale="pt-br"
                  v-model="date"
                  no-title
                  @input="onSelect"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-menu
                ref="menu2"
                color="orange"
                dense
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    color="orange"
                    dense
                    outlined
                    hide-details
                    v-model="dateFormattedF"
                    label="Data Final"
                    @blur="dateF = parseDate(dateFormattedF)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="orange"
                  locale="pt-br"
                  v-model="dateF"
                  no-title
                  @input="onSelect"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
        <div class="EmptyBox10" />
        <v-data-table
          dense
          no-data-text="Nenhum registro encontrado"
          no-results-text="Nenhum registro encontrado"
          class="elevation-0"
          :headers="headers"
          :items="andamentos"
          :items-per-page="10"
          :loading="loading"
          loading-text="Carregando... Por favor, aguarde"
          :footer-props="{
            'items-per-page-text': 'Linhas por página:',
            'items-per-page-all-text': 'Tudo',
            'items-per-page-options': [10, 20, 30, 40, 50]
        }"
        ></v-data-table>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import { AndamentoService } from "../services/AndamentoService";

export default {
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateF: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dateFormattedF: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    loading: false,
    andamentos: [],
    headers: [
      { text: "Dt.Cadastro", value: "andcaddat", width: "13%" },
      { text: "Data", value: "anddatand" },
      { text: "Horas", value: "andhorass", width: "7%" },
      { text: "Responsável", value: "andresseq.pesdescri", width: "10%" },
      { text: "Tipo", value: "andtipseq.tipdescri" },
      { text: "Projeto", value: "andetpseq.etppjtseq.pjttitulo", width: "12%" },
      { text: "Descrição", value: "anddescri" }
    ],
    andamentoService: new AndamentoService()
  }),
  mounted() {
    this.onSearch();
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
    dateF() {
      this.dateFormattedF = this.formatDate(this.dateF);
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    onSearch: async function() {
      this.loading = true;
      await this.andamentoService
        .getReports(this.date, this.dateF)
        .then(response => {
          response.data.forEach(element => {
            let data = new Date(element.anddatand);
            let dataCadastro = new Date(element.andcaddat);

            data.setDate(data.getDate() + 1);

            element.andcaddat = dataCadastro.toLocaleString();
            element.anddatand = data.toLocaleDateString();
            element.andresseq.pesdescri = element.andresseq.pesdescri.substr(0, element.andresseq.pesdescri.indexOf(" ") +1);
          });
          this.andamentos = response.data;
        })
        .catch(error => alert(error))
        .finally(() => this.loading = false);
    },
    onSelect: function() {
      this.menu1 = false;
      this.menu2 = false;
      this.onSearch();
    }
  }
};
</script>