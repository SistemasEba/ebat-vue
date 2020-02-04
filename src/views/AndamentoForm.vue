<template>
  <v-content>
    <v-container fluid>
      <v-alert
        :value="showSuces"
        type="success"
        prominent
        outlined
        dismissible
        border="left"
        icon="mdi-check"
        transition="scale-transition"
      >
        <v-row align="center">
          <v-col class="grow">Registro salvo com sucesso!</v-col>
          <v-col class="shrink">
            <v-btn
              small
              depressed
              class="ma-2"
              color="warning"
              @click="verRelatorio"
              >Ver Relatório</v-btn
            >
          </v-col>
        </v-row>
      </v-alert>
      <v-alert
        :value="showError"
        type="error"
        prominent
        outlined
        dismissible
        border="left"
        icon="mdi-close"
        transition="scale-transition"
        >{{ error }}</v-alert
      >
      <v-card outlined>
        <v-card-title style="color: #53565a" class="pb-0"
          >Cadastro de andamento da etapa
          {{ etapaBody.etpdescri }}</v-card-title
        >
        <v-card-text>
          <div class="EmptyBox15" />
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
                outlined
                hide-details
                v-model="dateFormatted"
                label="Data da Solicitação"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              scrollable
              year-icon="mdi-calendar-blank"
              prev-icon="mdi-skip-previous"
              next-icon="mdi-skip-next"
              reactive
              show-current
              color="orange"
              locale="pt-br"
              v-model="date"
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
          <div class="EmptyBox20" />
          <v-text-field
            outlined
            clearable
            dense
            id="horas"
            label="Horas Gastas"
            name="horas"
            type="number"
            :rules="rules"
            v-model="horas"
          />
          <v-select
            dense
            :items="responsaveis"
            v-model="responsavel"
            :rules="rules"
            item-text="pesdescri"
            item-value="pessequen"
            label="Responsável"
            outlined
          ></v-select>
          <v-select
            dense
            :items="tipos"
            v-model="tipo"
            :rules="rules"
            item-text="tipdescri"
            item-value="tipsequen"
            label="Tipo"
            outlined
          ></v-select>
          <v-textarea
            outlined
            name="descricao"
            label="Descrição"
            :rules="rules"
            v-model="descricao"
          ></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            small
            depressed
            outlined
            class="ma-2"
            color="warning"
            v-on:click="back"
          >
            <v-icon left>mdi-arrow-left</v-icon>Voltar
          </v-btn>
          <v-btn
            small
            depressed
            outlined
            class="ma-2"
            color="warning"
            v-on:click="save"
          >
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
          <v-btn color="orange darken-1" text v-on:click="dialog = false"
            >Não</v-btn
          >
          <v-btn color="orange darken-1" text v-on:click="remove">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import { EtapaService } from "../services/EtapaService";
import { AndamentoService } from "../services/AndamentoService";
import { TipoService } from "../services/TipoService";
import { PessoaService } from "../services/PessoaService";
export default {
  data: vm => ({
    id: null,
    date: vm.today(),
    dateFormatted: vm.formatDate(
      `${new Date().getFullYear()}-${new Date().getMonth() +
        1}-${new Date().getDate()}`
    ),
    etapa: null,
    projeto: null,
    etapaBody: {},
    menu1: false,
    error: null,
    horas: 8,
    responsavel: "",
    tipo: "",
    descricao: "",
    responsaveis: [],
    tipos: [],
    showSuces: false,
    showError: false,
    dialog: false,
    rules: [value => !!value || "Campo Obrigatório."],
    etapaService: new EtapaService(),
    andamentoService: new AndamentoService(),
    tipoService: new TipoService(),
    pessoaService: new PessoaService()
  }),
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  async mounted() {
    this.projeto = this.$route.params.projeto;
    this.etapa = this.$route.params.etapa;
    await this.tipoService
      .getType(3)
      .then(response => (this.tipos = response.data))
      .catch(error => {
        this.error = error;
        this.showError = true;
      });
    await this.pessoaService
      .getByPerfil(1)
      .then(response => {
        this.responsaveis = response.data;

        this.responsaveis.forEach(element => {
          if (element.pesdescri === localStorage.getItem("nome")) {
            this.responsavel = element.pessequen;
          }
        });
      })
      .catch(error => {
        this.error = error;
        this.showError = true;
      });

    await this.etapaService
      .getById(this.etapa)
      .then(response => {
        this.etapaBody = response.data;
      })
      .catch(error => {
        this.error = error;
        this.showError = true;
      });
    if (this.$route.params.id !== null && this.$route.params.id !== undefined) {
      this.id = this.$route.params.id;
      await this.getById();
    }
  },
  methods: {
    verRelatorio() {
      this.$router.push("/restrito/relatorio");
    },
    today() {
      var date = new Date();
      date.setHours(date.getHours() - 5);
      return date.toISOString().substr(0, 10);
    },
    getById: async function() {
      await this.andamentoService
        .getById(this.id)
        .then(response => {
          let registro = response.data;

          this.date = registro.anddatand;
          this.horas = registro.andhorass;
          this.responsavel = registro.andresseq.pessequen;
          this.tipo = registro.andtipseq.tipsequen;
          this.descricao = registro.anddescri;
        })
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    back: function() {
      this.$router.push(
        "/restrito/andamento/" + this.projeto + "/" + this.etapa
      );
    },
    remove: async function() {
      this.dialog = false;
      await this.andamentoService
        .remove(this.id)
        .then(() => {
          this.$router.push(
            "/restrito/andamento/" + this.projeto + "/" + this.etapa
          );
        })
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
    },
    save: async function() {
      if (this.id !== null && this.id !== undefined) {
        await this.andamentoService
          .update({
            id: this.id,
            anddatand: this.date,
            andhorass: this.horas,
            anddescri: this.descricao,
            andetpseq: this.etapaBody,
            andtipseq: this.tipo,
            andresseq: this.responsavel
          })
          .then(() => {
            this.showSuces = true;
          })
          .catch(error => {
            this.error = error;
            this.showError = true;
          });
      } else {
        await this.andamentoService
          .save({
            anddatand: this.date,
            andhorass: this.horas,
            anddescri: this.descricao,
            andetpseq: this.etapaBody,
            andtipseq: this.tipo,
            andresseq: this.responsavel
          })
          .then(() => {
            this.showSuces = true;
          })
          .catch(error => {
            this.error = error;
            this.showError = true;
          });
      }
    }
  }
};
</script>
