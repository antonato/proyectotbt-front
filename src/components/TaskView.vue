<template>
  <v-container>

    <v-layout justify-center>
      <v-flex xs6>
        <h2>Tarea + {{$router.params.idTask}} </h2>
          </v-flex>
    </v-layout>

    <v-layout justify-center>
       <td><v-flex class="mr-5 mt-3">{{ task.nombre }}</v-flex></td>
       <td><v-flex class="mr-5 mt-3">{{ task.finicio }}</v-flex></td>
       <td><v-flex class="mr-5 mt-3">{{ task.ffin }}</v-flex></td>
       <td><v-flex class="mr-5 mt-3">{{ task.descripcion }}</v-flex></td>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TaskView',
  props: {
    msg: String
  },

  data: ()=>({
    task:null
  }),

  mounted(){
    this.getTask();
  },

  methods: {
    getTask(){
    axios.get('http://localhost:8081/tarea/getById/11'+this.id)
      .then( response => {
        this.task = response.data
      })
      .catch( e=> console.log(e))
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>