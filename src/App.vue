<template>
  <v-app id="app1">
    <!-- <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

    <v-main>
      <v-container>
        <navigation @send-result="getData" v-bind:world="world" />
        <home v-bind:weatherData="weatherData" />
        <!-- <router-view /> -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import store from "./store";
import Home from "./views/Home.vue";
import Navigation from './components/Navigation.vue';

export default {
  name: "App",
  store,
  components: {
    Home,
    Navigation
  },
  data: () => ({
    weatherData: null
  }),
  methods: {
    getData(value) {
      this.weatherData = value;
      console.log(value);
    }
  },
  computed: {
    world() {
      return this.$store.state.world;
    },
  },
};
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';
</style>