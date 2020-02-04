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
            <v-btn small depressed class="ma-2" color="warning" @click="back"
              >Ver Projetos</v-btn
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
          >Cadastro de Projeto</v-card-title
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
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
          <div class="EmptyBox15" />
          <v-text-field
            outlined
            clearable
            dense
            id="titulo"
            label="Título"
            name="titulo"
            hide-details
            type="text"
            :rules="rules"
            v-model="titulo"
          />
          <div class="EmptyBox15" />
          <v-select
            dense
            :items="tipos"
            v-model="tipo"
            :rules="rules"
            hide-details
            item-text="tipdescri"
            item-value="tipsequen"
            label="Tipo"
            outlined
          ></v-select>
          <div class="EmptyBox15" />
          <v-select
            dense
            :items="nucleos"
            v-model="nucleco"
            :rules="rules"
            hide-details
            item-text="nucdescri"
            item-value="nucsequen"
            label="Núcleo"
            outlined
          ></v-select>
          <div class="EmptyBox15" />
          <v-select
            dense
            :items="solicitantes"
            v-model="solicitante"
            hide-details
            :rules="rules"
            item-text="pesdescri"
            item-value="pessequen"
            label="Solicitante"
            outlined
          ></v-select>
          <div class="EmptyBox15" />
          <v-select
            dense
            :items="responsaveis"
            v-model="responsavel"
            :rules="rules"
            hide-details
            item-text="pesdescri"
            item-value="pessequen"
            label="Responsável"
            outlined
          ></v-select>
          <div class="EmptyBox15" />
          <v-textarea
            outlined
            hide-details
            name="descricao"
            label="Descrição"
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
import { TipoService } from "../services/TipoService";
import { NucleoService } from "../services/NucleoService";
import { PessoaService } from "../services/PessoaService";
import { ProjetoService } from "../services/ProjetoService";

export default {
  data: vm => ({
    id: null,
    titulo: "",
    tipo: "",
    nucleco: "",
    solicitante: "",
    responsavel: "",
    descricao: "",
    tipos: [],
    nucleos: [],
    solicitantes: [],
    responsaveis: [],
    error: null,
    showSuces: false,
    showError: false,
    dialog: false,
    tipoService: new TipoService(),
    nucleoService: new NucleoService(),
    pessoaService: new PessoaService(),
    projetoService: new ProjetoService(),
    rules: [value => !!value || "Campo Obrigatório."],
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false
  }),
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  mounted() {
    this.tipoService
      .getType(1)
      .then(response => {
        this.tipos = response.data;
      })
      .catch(error => {
        this.error = error;
        this.showError = true;
      });

    this.nucleoService
      .getAll()
      .then(response => {
        this.nucleos = response.data;
      })
      .catch(error => {
        this.error = error;
        this.showError = true;
      });

    this.pessoaService
      .getByPerfil(2)
      .then(response => {
        this.solicitantes = response.data;
      })
      .catch(error => {
        this.error = error;
        this.showError = true;
      });

    this.pessoaService
      .getByPerfil(1)
      .then(response => {
        this.responsaveis = response.data;
      })
      .catch(error => {
        this.error = error;
        this.showError = true;
      });

    if (this.$route.params.id !== null && this.$route.params.id !== undefined) {
      this.id = this.$route.params.id;
      this.getById();
    }
  },
  methods: {
    getById: async function() {
      await this.projetoService
        .getById(this.id)
        .then(response => {
          this.date = new Date(response.data.pjtdatsol)
            .toISOString()
            .substr(0, 10);
          this.titulo = response.data.pjttitulo;
          this.tipo = response.data.pjttipseq;
          this.nucleco = response.data.pjtnucseq;
          this.solicitante = response.data.pjtsolseq;
          this.responsavel = response.data.pjtdevseq;
          this.descricao = response.data.pjtdescri;
        })
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
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
    back: function() {
      this.$router.push("/restrito/projeto");
    },
    save: async function() {
      if (this.id !== null && this.id !== undefined) {
        await this.projetoService
          .update({
            id: this.id,
            pjttitulo: this.titulo,
            pjtdescri: this.descricao,
            pjtdatsol: this.date,
            pjttipseq: this.tipo,
            pjtnucseq: this.nucleco,
            pjtsolseq: this.solicitante,
            pjtdevseq: this.responsavel
          })
          .then(() => {
            this.showSuces = true;
          })
          .catch(error => {
            this.error = error;
            this.showError = true;
          });
      } else {
        await this.projetoService
          .save({
            pjttitulo: this.titulo,
            pjtdescri: this.descricao,
            pjtdatsol: this.date,
            pjttipseq: this.tipo,
            pjtnucseq: this.nucleco,
            pjtsolseq: this.solicitante,
            pjtdevseq: this.responsavel
          })
          .then(() => {
            this.showSuces = true;
          })
          .catch(error => {
            this.error = error;
            this.showError = true;
          });
      }
    },
    remove: async function() {
      this.dialog = false;
      await this.projetoService
        .remove(this.id)
        .then(() => {
          this.$router.push("/restrito/projeto");
        })
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
    }
  }
};
</script>
