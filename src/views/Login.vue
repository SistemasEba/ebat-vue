<template>
  <v-content>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-alert
            :value="obrig"
            type="warning"
            dense
            dark
            prominent
            outlined
            border="left"
            icon="mdi-exclamation"
            transition="scale-transition"
          >Informe todos os campos.</v-alert>
          <v-alert
            :value="alert"
            type="warning"
            dark
            dense
            prominent
            outlined
            border="left"
            icon="mdi-exclamation"
            transition="scale-transition"
          >Credenciais inválidas, tente novamente com novos dados.</v-alert>
          <v-alert
            :value="error"
            type="error"
            dark
            dense
            prominent
            outlined
            border="left"
            icon="mdi-close"
            transition="scale-transition"
          >Ocorreu um erro inesperado de comunicação com o servidor.</v-alert>
          <v-card class="elevation-12">
            <v-toolbar color="#53565a" dark flat>
              <v-toolbar-title class="Wid100 TexAlCenter">
                <img src="../assets/img/logo-branca.png" width="240px" />
              </v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Sigla"
                  name="sigla"
                  type="text"
                  dense
                  counter
                  outlined
                  clearable
                  v-model="sigla"
                  color="orange"
                  :rules="rules"
                  maxlength="3"
                  v-on:keyup="upper"
                  :disabled="lembr"
                />
                <v-text-field
                  dense
                  outlined
                  clearable
                  id="password"
                  label="Senha"
                  name="senha"
                  type="password"
                  v-model="senha"
                  color="orange"
                  :rules="rulesPassword"
                  v-if="lembr == false"
                  v-on:keyup.enter="login"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn class="ma-2" text color="warning" v-on:click="another" v-if="lembr">Outra Conta</v-btn>
              <v-checkbox v-model="remeb" color="orange" label="Lembrar-me" v-if="lembr == false"></v-checkbox>
              <v-spacer />
              <v-btn class="ma-2" text color="warning" v-on:click="login">Acessar</v-btn>
            </v-card-actions>
          </v-card>
          <div class="EmptyBox10"></div>
          <p class="text-center Fs13">EBAT - <strong>Ernesto Borges Advogados</strong> | Copyright &copy; 2020</p>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { PessoaService } from "../services/PessoaService";
export default {
  data() {
    return {
      sigla: "",
      senha: "",
      remeb: false,
      lembr: false,
      alert: false,
      error: false,
      obrig: false,
      rules: [
        value => !!value || "Campo Obrigatório.",
        value => (value || "").length <= 3 || "Máximo 3 caracteres"
      ],
      rulesPassword: [value => !!value || "Campo Obrigatório."],
      pessoaService: new PessoaService()
    };
  },
  mounted() {
    let lembrar = localStorage.getItem("lembr");
    if(lembrar !== undefined && lembrar) {
      this.lembr = true;
      this.sigla = localStorage.getItem("sigla");
    }
  },
  methods: {
    login: async function() {
      if(this.lembr) {
        this.$router.push("/restrito/index");
        return;
      }

      this.obrig = false;
      if (this.sigla !== "" && this.senha !== "") {
        await this.pessoaService
          .autenticar(this.sigla, this.senha)
          .then(response => {
            window.console.log(response);
            localStorage.setItem("id", response.data.pessequen);
            localStorage.setItem("nome", response.data.pesdescri);
            localStorage.setItem("sigla", response.data.pessiglaa);
            localStorage.setItem("lembr", this.remeb);
            this.$router.push("/restrito/index");
          })
          .catch(error => this.showMessage(error));
      } else {
        this.obrig = true;
      }
    },
    upper: function(e) {
      e.target.value = e.target.value.toUpperCase();
      this.sigla = e.target.value.toUpperCase();
    },
    showMessage: function(error) {
      if (error.response.status === 404) this.alert = true;
      else this.error = true;
    },
    another: function() {
      this.lembr = false;
      localStorage.removeItem("id");
      localStorage.removeItem("nome");
      localStorage.removeItem("sigla");
      localStorage.removeItem("lembr");
    }
  }
};
</script>