<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-btn icon color="blue" @click="goHome">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="../src/assets/placeholder.svg"
            transition="scale-transition"
            width="40"
          />
        </v-btn>
        <h3 style="margin-bottom: 0;">Sistema de Emergencias</h3>
      </div >
      <v-spacer></v-spacer>
      <div v-if = 'rol == 0' >
      <v-btn text to="/registroAdmin">
      <v-icon left>
        mdi-pencil
      </v-icon>
      Registrar Admin
    </v-btn>
    </div>
      <div v-if = "logeado">
      <v-btn text @click="logOut">
        <v-icon>mdi-heart</v-icon>
        Salir  
      </v-btn> 
      </div>
      <div v-else>   
      <v-btn text to="/login">
        <v-icon>mdi-heart</v-icon>
      Acceder
      </v-btn> 
      </div>
    </v-app-bar>
    <v-main>
      <router-view to="/taskList"></router-view>
    </v-main>
  </v-app>
</template>

<script>
//import axios from 'axios';

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    logeado: localStorage.getItem('logeado'),
    rol: localStorage.getItem('rol')
  }),
  methods: {
    goHome() {
      window.location.href = '/';
    },
    logOut(){
      console.log("hola ke ase");
      //axios.post('http://localhost:8081/user/logOut/')
      //.then (()=>{
        this.logeado = false;
        localStorage.removeItem('logeado');
        this.rol = 0
        localStorage.removeItem('rol');
        location.reload();
        this.$router.push("/");
      //})
      //catch( e=> console.log(e))
    }
  }
  
};

</script>


