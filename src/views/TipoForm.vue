<template>
  <v-content>
    <v-container fluid>
      <v-card outlined>
        <v-card-title style="color: #53565a" class="pb-0">Cadastro de Tipo</v-card-title>
        <v-card-text>
          <div class="EmptyBox10" />
          <v-text-field
            outlined
            clearable
            dense
            id="nome"
            label="Nome"
            name="nome"
            type="text"
            v-model="nome"
          />
          <v-text-field
            outlined
            clearable
            dense
            id="posicao"
            label="Posição"
            name="posicao"
            type="number"
            v-model="posicao"
          />
        </v-card-text>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      nome: "",
      posicao: ""
    };
  }
};
</script>