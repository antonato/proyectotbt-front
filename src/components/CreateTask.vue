<template>
  <v-container>
    <v-layout justify-center>
        <v-flex xs6>
          <h2>Agregar Tarea</h2>
            </v-flex>
    </v-layout>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="task.nombre"
        :counter="30"
        :rules="nameRules"
        label="Nombre Tarea"
        required
      ></v-text-field>  

      <v-text-field v-model="task.cant_vol_requeridos" type="number" label="Voluntarios Requeridos"></v-text-field>

      <v-text-field
        v-model="task.descripcion"
        :counter="30"
        :rules="descriptionRules"
        label="Descripción"
        required
      ></v-text-field>

      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-date-picker
              v-model="dates"
              range
            ></v-date-picker>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="dateRangeText"
              label="Date range"
              prepend-icon="mdi-calendar"
              readonly
            ></v-text-field>
            model: {{ dates }}
          </v-col>
        </v-row>
      </v-container>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="send"
      >
        Crear
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>

import axios from 'axios';

export default {
  name: 'CreateTask',
  props: {
    msg: String
  },
  data: function(){
      return{
          error: false,
          error_msg: "",
          nameRules: [
            v => !!v || 'Nombre es requerido',
            v => (v && v.length >= 3) || 'El nombre no puede tener menos de 3 caracteres',
          ],
          descriptionRules: [
            v => !!v || 'Descripción es requerida',
            v => (v && v.length >= 3) || 'La descripción no puede tener menos de 3 caracteres',
          ],
          valid: true,
          dates: ['2020-11-20', '2020-12-20'],
          task: {
              id: null,
              id_emergencia: null,
              id_estado: null,
              nombre: "",
              finicio: null,
              ffin: null,
              cant_vol_inscritos: 0,
              cant_vol_requeridos: null,
              invisible: 0,
              descripcion: ""
          }
      }
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      send(){
        console.log(this.dates[0]);
            this.task.finicio = this.dates[0];
            if(this.dates[1] !=null){
              this.task.ffin = this.dates[1];
            }
            console.log(this.task);
            let json = {
              "id": this.task.id,
              "id_emergencia": this.task.id_emergencia,
              "id_estado": this.task.id_estado,
              "nombre": this.task.nombre,
              "finicio": this.task.finicio,
              "ffin": this.task.ffin,
              "cant_vol_inscritos": this.task.cant_vol_inscritos,
              "cant_vol_requeridos": this.task.cant_vol_requeridos,
              "invisible": this.task.invisible,
              "descripcion": this.task.descripcion
            }
            axios.post('http://localhost:8081/tarea/create', json)
            .then( data=> {
                if(data.data.status == 'ok'){
                  localStorage.token = data.data.result.token;
                  this.$router.push()
                } else {
                  this.error = true;
                  this.error_msg = data.data.result.error_msg;
                }
              }
            )
      }
    },
    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
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