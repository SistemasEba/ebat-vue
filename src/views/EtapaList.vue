<template>
  <v-content>
    <v-container fluid>
      <v-btn small depressed outlined color="primary" v-on:click="goToProjetos">
        <v-icon>mdi-arrow-left</v-icon>Voltar
      </v-btn>
      <v-btn small depressed outlined color="primary" class="ma-2" v-on:click="goToForm">
        <v-icon>mdi-plus</v-icon>Adicionar
      </v-btn>
      <div class="EmptyBox10"></div>
      <v-card outlined>
        <v-card-title style="color: #53565a">
          Etapas para {{projetoBody.pjttitulo}}
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
          @click:row="select"
          v-model="selected"
          no-data-text="Nenhum registro encontrado"
          no-results-text="Nenhum registro encontrado"
          class="elevation-0"
          :headers="headers"
          :items="etapas"
          :items-per-page="10"
          :search="search"
          :footer-props="{
            'items-per-page-text': 'Linhas por página:',
            'items-per-page-all-text': 'Tudo'
        }"
        >
          <template v-slot:item.action="{ item }">
            <v-icon title="Editar" small class="mr-2" @click="goToFormEdit(item.etpsequen)">mdi-pencil</v-icon>
            <v-icon title="Ver andamentos" small @click="goToAndamentos(item.etpsequen)">mdi-arrow-right</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import { ProjetoService } from "../services/ProjetoService";
import { EtapaService } from "../services/EtapaService";
export default {
  data() {
    return {
      projeto: null,
      projetoBody: {},
      etapas: [],
      selected: [],
      error: null,
      search: "",
      headers: [
        { text: "Data", value: "etpdatini", align: "center", width: "10%" },
        {
          text: "Tipo",
          value: "etptipseq.tipdescri",
          align: "center",
          width: "15%"
        },
        { text: "Descrição", value: "etpdescri", align: "center" },
        {
          text: "Horas Previstas",
          value: "etphrspre",
          align: "center",
          width: "11%"
        },
        {
          text: "Horas Gastas",
          value: "somaHorasAndamentos",
          align: "center",
          width: "10%"
        },
        { text: "Ações", value: "action", sortable: false, width: "7%" }
      ],
      showSuces: false,
      showError: false,
      projetoService: new ProjetoService(),
      etapaService: new EtapaService()
    };
  },
  async mounted() {
    if (
      this.$route.params.projeto !== null &&
      this.$route.params.projeto !== undefined
    ) {
      this.projeto = this.$route.params.projeto;
      await this.getProjetoById();
      await this.load();
    }
  },
  methods: {
    load: async function() {
      await this.etapaService
        .getByProjeto(this.projeto)
        .then(response => {
          let registros = response.data;

          registros.forEach(element => {
            let dataIni = new Date(element.etpdatini);
            dataIni.setDate(dataIni.getDate() + 1);
            element.etpdatini = dataIni.toLocaleDateString();
          });

          this.etapas = registros;
        })
        .catch(error => alert(error));
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
    goToForm: function() {
      this.$router.push("/restrito/etapa/" + this.projeto + "/form");
    },
    goToFormEdit: function(idEtapa) {
      this.$router.push("/restrito/etapa/" + this.projeto + "/form/" + idEtapa);
    },
    goToProjetos: function() {
      this.$router.push("/restrito/projeto");
    },
    goToAndamentos: function(idEtapa) {
      this.$router.push("/restrito/andamento/" + this.projeto + "/" + idEtapa);
    },
    select: function(item) {
      this.$router.push("/restrito/andamento/" + this.projeto + "/" + item.etpsequen);
    },
  }
};
</script>