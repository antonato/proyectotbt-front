<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-btn icon color="blue" @click="goHome">
          <v-icon medium>mdi-home</v-icon>
          <!--<v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="../src/assets/logo.png"
            transition="scale-transition"
            width="40"
          />-->
        </v-btn>
        <h3 style="margin-bottom: 0;">Sistema de Emergencias</h3>
      </div>    

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <router-view to="/taskList"></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    //
  }),
  methods: {
    goHome() {
      window.location.href = '/';
    }
  }
};

</script>