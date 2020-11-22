<template>
  <v-container fluid>
    <v-data-iterator
      :tasks="tasks"
      :tasks-per-page.sync="tasksPerPage"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="indigo darken-5"
          dark
          flat
        >
          <v-toolbar-title>This is a header</v-toolbar-title>
        </v-toolbar>
      </template>

      <template>
        <v-row>
          <v-col
            v-for="task in tasks"
            :key="task.nombre"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ task.nombre }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>

                <v-list-task>
                  <v-list-task-content>Fecha de Inicio:</v-list-task-content>
                  <v-list-task-content class="align-end">
                    {{ task.finicio }}
                  </v-list-task-content>
                </v-list-task>

                <v-list-task>
                  <v-list-task-content>Fecha de Termino:</v-list-task-content>
                  <v-list-task-content class="align-end">
                    {{ task.ffin }}
                  </v-list-task-content>
                </v-list-task>

                <v-list-task>
                  <v-list-task-content>Cantidad Inscritos:</v-list-task-content>
                  <v-list-task-content class="align-end">
                    {{ task.cant_vol_inscritos }}
                  </v-list-task-content>
                </v-list-task>

                <v-list-task>
                  <v-list-task-content>Cantidad Requeridos:</v-list-task-content>
                  <v-list-task-content class="align-end">
                    {{ task.cant_vol_requeridos }}
                  </v-list-task-content>
                </v-list-task>

                <v-list-task>
                  <v-list-task-content>Descripcion:</v-list-task-content>
                  <v-list-task-content class="align-end">
                    {{ task.descripcion }}
                  </v-list-task-content>
                </v-list-task>

             
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-toolbar
          class="mt-2"
          color="indigo"
          dark
          flat
        >
          <v-toolbar-title class="subheading">
            This is a footer
          </v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'TaskList',
  props: {
    msg: String
  },
  
  data: ()=>({
    tasks: null,
    tasksPerPage: 5,
  }),

  async mounted(){
    this.getTasks();
  },

  methods: {
    async getTasks(){
    await axios.get('http://localhost:8081/tarea/getAll')
      .then( response => {
        this.tasks = response.data
        console.log(this.tasks);
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
