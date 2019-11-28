<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense flat>
        <div class="TexAlCenter">
          <div class="EmptyBox10" />
          <img
            alt="imagem-usuario"
            :src="image"
            style="width: 90px; border-radius: 50px;"
            v-on:click="show"
          />
          <div class="EmptyBox5" />
          <span class="Fs13">{{nome}}</span>
          <div class="EmptyBox5" />
          <v-btn text color="red" class="Fs13" v-on:click="exit">Sair</v-btn>
        </div>

        <v-list-item-group v-model="model" color="orange">
          <v-list-item v-for="(item, i) in items" :key="i" v-on:click="changePage(i)">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#53565a" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <img alt="logo-template" src="../assets/img/logo-branca.png" width="240px" />
      </v-toolbar-title>
    </v-app-bar>

    <v-dialog v-model="dialog" max-width="426">
      <v-card>
        <v-card-title class="headline">{{nome}}</v-card-title>
        <v-card-text>
          <v-alert
            :value="showMessage"
            :type="typeMessage"
            dark
            prominent
            dense
            border="left"
            :icon="iconMessage"
            transition="scale-transition"
          >{{message}}</v-alert>
          <v-file-input
            label="Foto"
            v-model="imageSend"
            name="file"
            outlined
            dense
            append-outer-icon="mdi-send"
            @click:append-outer="send"
          ></v-file-input>
          <v-text-field
            dense
            outlined
            clearable
            v-model="senha"
            label="Senha"
            prepend-icon="mdi-key"
            class="Fs13"
            type="password"
            color="orange"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            dense
            outlined
            clearable
            v-model="senhaRepitida"
            prepend-icon="mdi-key-change"
            label="Senha Repetida"
            class="Fs13"
            type="password"
            color="orange"
            :rules="rules"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange darken-1" text v-on:click="dialog = false">Cancelar</v-btn>
          <v-btn color="orange darken-1" text v-on:click="changePassord">Salvar Senha</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { PessoaService } from "../services/PessoaService";
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    dialog: false,
    senha: "",
    senhaRepitida: "",
    nome: localStorage.getItem("nome"),
    imageSend: [],
    showMessage: false,
    message: "",
    typeMessage: "",
    iconMessage: "",
    image:
      "http://services.ernestoborges.com.br/ebat/pessoa/imagem-usuario?id=" +
      localStorage.getItem("id") +
      "&rd=" +
      Math.random()
        .toString(36)
        .substring(7),
    rules: [
      value => !!value || "Campo Obrigatório.",
      value => (value || "").length >= 6 || "Mínimo 6 caracteres"
    ],
    items: [
      {
        icon: "mdi-scale-balance",
        text: "Regras",
        url: "/restrito/index"
      },
      {
        icon: "mdi-account-group",
        text: "Pessoas",
        url: "/restrito/pessoa"
      },
      {
        icon: "mdi-table-large",
        text: "Núcleos",
        url: "/restrito/nucleo"
      },
      {
        icon: "mdi-file-document-box-multiple",
        text: "Projetos",
        url: "/restrito/projeto"
      },
      {
        icon: "mdi-account-box",
        text: "Tipos",
        url: "/restrito/tipo"
      },
      {
        icon: "mdi-chart-line",
        text: "Relatório",
        url: "/restrito/relatorio"
      },
      {
        icon: "mdi-view-dashboard",
        text: "Lançamentos",
        url: "/restrito/lancamento"
      },
      {
        icon: "mdi-chart-pie",
        text: "Dashboard",
        url: "/restrito/dashboard"
      }
    ],
    model: 0,
    pessoaService: new PessoaService()
  }),
  mounted() {
    let id = localStorage.getItem("id");
    if (id === undefined || id === null) {
      this.$router.push("/");
    }
  },
  created() {
    let i = 0;
    let t = this.$router.history.current.path;

    this.items.forEach(element => {
      if (t.includes(element.url)) {
        this.model = i;
      } else {
        i++;
      }
    });
  },
  methods: {
    changePage: function(i) {
      switch (i) {
        case 1:
          this.$router.push("/restrito/pessoa");
          break;
        case 2:
          this.$router.push("/restrito/nucleo");
          break;
        case 3:
          this.$router.push("/restrito/projeto");
          break;
        case 4:
          this.$router.push("/restrito/tipo");
          break;
        case 5:
          this.$router.push("/restrito/relatorio");
          break;
        case 6:
          this.$router.push("/restrito/lancamento");
          break;
        case 7:
          this.$router.push("/restrito/dashboard");
          break;
        default:
          this.$router.push("/restrito/index");
          break;
      }
      this.model = i;
    },
    exit: function() {
      let lembrar = localStorage.getItem("lembr") == "true";

      if (lembrar == false) {
        localStorage.removeItem("id");
        localStorage.removeItem("nome");
        localStorage.removeItem("sigla");
        localStorage.removeItem("lembr");
      }

      this.$router.push("/");
    },
    show() {
      this.dialog = true;
    },
    send() {
      this.pessoaService
        .changePhoto(localStorage.getItem("id"), this.imageSend)
        .then(() => {
          this.image =
            "http://services.ernestoborges.com.br/ebat/pessoa/imagem-usuario?id=" +
            localStorage.getItem("id") +
            "&rd=" +
            Math.random()
              .toString(36)
              .substring(7);
          this.dialog = false;
          this.imageSend = [];
        })
        .cath(error => alert(error));
    },
    changePassord() {
      if (this.senha === this.senhaRepitida) {
        this.pessoaService
          .mudarCredenciais(this.senha, localStorage.getItem("id"))
          .then(() => {
            this.message = "Senha alterada com sucesso";
            this.typeMessage = "success";
            this.iconMessage = "mdi-check";
            setTimeout(() => {
              this.showMessage = false;
              this.dialog = false;
              this.senha = "";
              this.senhaRepitida = "";
            }, 2000);
          })
          .catch(error => {
            this.message = error;
            this.typeMessage = "error";
            this.iconMessage = "mdi-close";
          })
          .finally(() => (this.showMessage = true));
      } else {
        this.typeMessage = "error";
        this.iconMessage = "mdi-close";
        this.message = "As senhas não conferem.";
        this.showMessage = true;
      }
    }
  }
};
</script>