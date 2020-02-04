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
                    v-mask="mask"
                    v-model="dateFormatted"
                    label="Data Inicial"
                    @blur="date = parseDate(dateFormatted)"
                    v-on:keyup="onSelect"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  scrollable
                  year-icon="mdi-calendar-blank"
                  prev-icon="mdi-skip-previous"
                  next-icon="mdi-skip-next"
                  color="orange"
                  locale="pt-br"
                  v-model="date"
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
                    v-mask="mask"
                    v-model="dateFormattedF"
                    label="Data Final"
                    @blur="dateF = parseDate(dateFormattedF)"
                    v-on:keyup="onSelect"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  scrollable
                  year-icon="mdi-calendar-blank"
                  prev-icon="mdi-skip-previous"
                  next-icon="mdi-skip-next"
                  color="orange"
                  locale="pt-br"
                  v-model="dateF"
                  @input="onSelect"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-spacer />
            <v-col cols="12" sm="12" md="5">
              <v-text-field
                v-model="search"
                append-icon="fa fa-search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
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
          :search="search"
          loading-text="Carregando... Por favor, aguarde"
          :footer-props="{
            'items-per-page-text': 'Linhas por página:',
            'items-per-page-all-text': 'Tudo',
            'items-per-page-options': [10, 20, 30, 40, 50, 100, 250]
          }"
        >
          <template v-slot:item.action="{ item }">
            <v-icon
              v-if="checkEditPermission(item)"
              title="Editar Andamento"
              @click="select(item)"
              color="orange"
              >mdi-pencil</v-icon
            >
          </template>
          <!-- <template v-slot:item.andresseq.pesdescri="{ item }">
            <v-chip
              v-if="checkEditPermission(item)"
              color="orange"
              dark
              class="text-left"
              >{{ item.andresseq.pesdescri }}</v-chip
            >
            <div v-if="!checkEditPermission(item)" class="text-left">
              {{ item.andresseq.pesdescri }}
            </div>
          </template> -->
        </v-data-table>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import { mask } from "vue-the-mask";
import { AndamentoService } from "../services/AndamentoService";

export default {
  directives: {
    mask
  },
  data: vm => ({
    search: "",
    clisequen: 0,
    date: vm.today(),
    dateF: vm.today(),
    dateFormatted: vm.formatDate(vm.today()),
    dateFormattedF: vm.formatDate(vm.today()),
    menu1: false,
    menu2: false,
    loading: false,
    andamentos: [],
    andamentoSelected: {},
    etapaSelected: {},
    projetoSelected: {},
    mask: "##/##/####",
    headers: [
      { text: "Dt.Cadastro", value: "andcaddat", width: "13%" },
      { text: "Data", value: "anddatand" },
      { text: "Horas", value: "andhorass", width: "7%" },
      { text: "Responsável", value: "andresseq.pesdescri", width: "10%" },
      { text: "Tipo", value: "andtipseq.tipdescri" },
      { text: "Projeto", value: "andetpseq.etppjtseq.pjttitulo", width: "12%" },
      { text: "Descrição", value: "anddescri" },
      { text: "Ações", value: "action", sortable: false, width: "4%" }
    ],
    andamentoService: new AndamentoService()
  }),
  mounted() {
    this.clisequen = localStorage.getItem("id");
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
    today() {
      var date = new Date();
      date.setHours(date.getHours() - 5);
      return date.toISOString().substr(0, 10);
    },
    checkEditPermission(item) {
      return item.andresseq.pessequen == this.clisequen;
    },
    select(item) {
      this.$router.push(
        `/restrito/andamento/${item.andetpseq.etppjtseq.pjtsequen}/${item.andetpseq.etpsequen}/form/${item.andsequen}`
      );
    },
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
            element.andresseq.pesdescri = element.andresseq.pesdescri.substr(
              0,
              element.andresseq.pesdescri.indexOf(" ") + 1
            );
          });
          this.andamentos = response.data;
        })
        .catch(error => alert(error))
        .finally(() => (this.loading = false));
    },
    onSelect: function() {
      this.menu1 = false;
      this.menu2 = false;
      this.onSearch();
    }
  }
};
</script>
