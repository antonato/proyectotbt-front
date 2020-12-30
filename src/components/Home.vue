<template>
    <div class="d-flex align-items-center h-100 justify-center">
        <div>
            <Login :msg="openDialog" v-on:logeado="logged = $event"></Login>
            <v-container  v-if="logged === false" class="d-flex justify-center align-items-center w-100 h-100 mt-5 p-5">
                <img src="../../src/assets/placeholder.svg" alt="" width="100px">
                <v-col md="5">
                    <v-container class="d-flex align-center h-100">
                        <h1>Bienvenido al Sistema de Emergencias</h1>
                    </v-container>
                </v-col>
                <v-col class="d-flex flex-column flex-nowrap" md="4">
                            <v-btn color="success" @click="dialogTrue()" class="mr-4 mb-2">
                                    Inicia Sesión
                            </v-btn>
                </v-col>
            </v-container>
        </div>
        <v-container  v-if="logged === true" class="d-flex justify-center align-items-center w-100 h-100 mt-5 p-5">
            <img src="../../src/assets/placeholder.svg" alt="" width="100px">
            <v-col md="5">
                <v-container class="d-flex align-center h-100">
                    <h1>Bienvenido al Sistema de Emergencias</h1>
                </v-container>
            </v-col>
            <v-col class="d-flex flex-column flex-nowrap" md="4">
                    <router-link to="/taskList">
                        <v-btn color="success" class="mr-4 mb-2">
                                Ver lista de Emergencias
                        </v-btn>
                    </router-link>
                    <router-link to="/createEmergency">
                        <v-btn color="success" class="mr-4 mb-2">
                            Crear Emergencia
                        </v-btn>
                    </router-link>
                    <router-link to="/createTask">
                        <v-btn color="success" class="mr-4 mb-2">
                            Crear Tarea
                        </v-btn>
                    </router-link>
                    <router-link to="/searchVolunteer">
                        <v-btn color="success" class="mr-4 mb-2">
                            Buscar voluntarios por tarea
                        </v-btn>
                    </router-link>
            </v-col>
        </v-container>
    </div>
</template>


<script>
    import Login from './Login.vue';

    export default {
        components: {
            Login
        },
        data: () => ({
            logged: false,
            openDialog: false
        }),
        methods: {
            dialogTrue(){
                this.openDialog = true;
            }
        }
    }
</script>

<style>

</style>