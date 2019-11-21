<template>
  <v-app id="inspire">
    <router-view name="header"></router-view>
    <fade-transition origin="center" mode="out-in" :duration="250">
      <router-view />
    </fade-transition>
    <router-view name="footer"></router-view>
  </v-app>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
export default {
  components: {
    FadeTransition
  }
};
</script>