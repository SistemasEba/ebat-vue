<template>
  <v-content>
    <v-container fluid>
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
            color="orange"
          />
          <v-select dense color="orange" :items="items" label="Perfil" outlined></v-select>
          <v-select dense color="orange" :items="items" label="Núcleo" outlined></v-select>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions >
          <v-btn small depressed outlined class="ma-2" color="warning" v-on:click="back">
            <v-icon left>mdi-arrow-left</v-icon>Voltar
          </v-btn>
          <v-btn small depressed outlined class="ma-2" color="warning" v-on:click="back">
            <v-icon left>mdi-content-save</v-icon>Salvar
          </v-btn>
          <v-btn small depressed outlined class="ma-2" color="red" dark v-on:click="back">
            <v-icon left>mdi-close</v-icon>Remover
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      nome: "",
      sigla: "",
      senha: "",
      perfil: "",
      nucleo: "",
      ferias: false,
      items: ["Foo", "Bar", "Fizz", "Buzz"]
    };
  },
  methods: {
    back: function() {
      this.$router.push("/restrito/pessoa");
    }
  }
};
</script>