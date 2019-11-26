<template>
  <v-content>
    <v-container fluid>
      <v-alert :value="showSuces" 
        type="success"
        dark
        prominent
        dense
        border="left"
        icon="mdi-check"
        transition="scale-transition">Operação realizada com sucesso!</v-alert>
      <v-alert
        :value="showError"
        type="error"
        dark
        prominent
        dense
        border="left"
        icon="mdi-close"
        transition="scale-transition"
      >{{error}}</v-alert>
      <v-card outlined>
        <v-card-title style="color: #53565a" class="pb-0">Cadastro de Pessoa</v-card-title>
        <v-card-text>
          <v-checkbox v-model="ferias" color="orange" label="Férias?"></v-checkbox>
          <v-text-field
            outlined
            clearable
            dense
            id="nome"
            label="Nome"
            name="nome"
            type="text"
            v-model="nome"
            color="orange"
            :rules="rules"
          />
          <v-text-field
            dense
            outlined
            clearable
            id="sigla"
            label="Sigla"
            name="sigla"
            type="text"
            v-model="sigla"
            :rules="ruleSigla"
            color="orange"
          />
          <v-text-field
            dense
            outlined
            clearable
            id="senha"
            label="Senha"
            name="senha"
            type="password"
            v-model="senha"
            v-if="this.id === null || this.id === undefined"
            color="orange"
          />
          <v-select
            dense
            color="orange"
            v-model="perfil"
            :items="perfis"
            item-text="label"
            :rules="rules"
            item-value="value"
            label="Perfil"
            outlined
          ></v-select>
          <v-select
            dense
            color="orange"
            :items="nucleos"
            v-model="nucleo"
            :rules="rules"
            item-text="nucdescri"
            item-value="nucsequen"
            label="Núcleo"
            outlined
          ></v-select>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn small depressed outlined class="ma-2" color="warning" v-on:click="back">
            <v-icon left>mdi-arrow-left</v-icon>Voltar
          </v-btn>
          <v-btn small depressed outlined class="ma-2" color="warning" v-on:click="save">
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
          <v-btn color="orange darken-1" text @click="dialog = false">Não</v-btn>
          <v-btn color="orange darken-1" text @click="remove">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import { PessoaService } from "../services/PessoaService";
import { NucleoService } from "../services/NucleoService";
export default {
  data() {
    return {
      id: null,
      nome: "",
      sigla: "",
      senha: null,
      perfil: "",
      nucleo: "",
      ferias: false,
      dialog: false,
      perfis: [
        { key: 1, value: 1, label: "Desenvolvedor" },
        { key: 2, value: 2, label: "Gestor" },
        { key: 3, value: 3, label: "Sistemas" },
        { key: 4, value: 4, label: "Master" },
        { key: 5, value: 5, label: "Outros" },
        { key: 6, value: 6, label: "Solicitante" }
      ],
      error: null,
      showSuces: false,
      showError: false,
      nucleos: [],
      ruleSigla: [
        value => !!value || "Campo Obrigatório.",
        value => (value || "").length <= 3 || "Máximo 3 caracteres"
      ],
      rules: [value => !!value || "Campo Obrigatório."],
      pessoaService: new PessoaService(),
      nucleoService: new NucleoService()
    };
  },
  mounted() {
    if (this.$route.params.id !== null && this.$route.params.id !== undefined) {
      this.id = this.$route.params.id;
      this.getById();
    }
    this.nucleoService
      .getAll()
      .then(response => {
        this.nucleos = response.data;
      })
      .catch(error => {
        this.error = error;
        this.showError = true;
      });
  },
  methods: {
    getById: async function() {
      await this.pessoaService
        .getById(this.id)
        .then(response => {
          let pessoa = response.data;

          this.nome = pessoa.pesdescri;
          this.sigla = pessoa.pessiglaa;
          this.perfil = pessoa.pesperfil;
          this.ferias = pessoa.pesferias === "S" ? true : false;
          this.nucleo = pessoa.pesnucseq.nucsequen;
        })
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
    },
    save: async function() {
      if (this.id !== null && this.id !== undefined) {
        await this.pessoaService.update({
          pessequen: this.id,
          pesdescri: this.nome,
          pessiglaa: this.sigla,
          pesperfil: this.perfil,
          pesferias: this.ferias ? "S" : "N",
          pesnucseq: this.nucleo
        })
        .then(() => {
          this.showSuces = true;
        })
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
      } else {
        let state = {
          pesdescri: this.nome,
          pessiglaa: this.sigla,
          pesssenha: this.senha,
          pesperfil: this.perfil,
          pesferias: this.ferias ? "S" : "N",
          pesnucseq: this.nucleo
        };
        window.console.log(state);
        await this.pessoaService.save(state)
        .then(() => {
          this.showSuces = true;
          setTimeout(() => this.$router.push("/restrito/pessoa"), 2000);
        })
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
      }
    },
    remove: async function() {
      this.dialog = false;
      await this.pessoaService
        .remove(this.id)
        .then(() => {
          this.$router.push("/restrito/pessoa");
        })
        .catch(error => {
          this.error = error;
          this.showError = true;
        });
    },
    back: function() {
      this.$router.push("/restrito/pessoa");
    }
  }
};
</script>