<template>
  <v-content>
    <v-container fluid>
      <div class="TexAlCenter" style="width: 100%; height: 84vh">
        <iframe title="Dashboard" :src="link" class="Wid100 Hei100" />
      </div>
    </v-container>
  </v-content>
</template>

<script>
import { ParametroService } from "../services/ParametroService";
export default {
  data() {
    return {
      link: "",
      parametroService: new ParametroService()
    };
  },
  created() {
    this.parametroService
      .getById(1)
      .then(response => {
        this.link = response.data.prtusdnom;
      })
      .catch(error => {
        alert(error);
      });
  }
};
</script>