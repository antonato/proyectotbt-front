<template>
    <div class="d-flex align-items-center h-100 justify-center">
        <div>
            <v-container class="d-flex justify-center align-items-center w-100 h-100 mt-5 p-5">
                <img src="../../src/assets/placeholder.svg" alt="" width="100px">
                <v-col md="5">
                    <v-container class="d-flex align-center h-100">
                        <h1>Ingresaste al Sistema de Emergencias como voluntario</h1>
                    </v-container>
                </v-col>
                <v-col class="d-flex flex-column flex-nowrap" md="4">
                    <v-btn color="error" @click="LogOut" class="mr-4 mb-2">
                            Salir
                    </v-btn>
                </v-col>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VolunteerView',
    methods: {
        LogOut(){
            this.logged = false;
            localStorage.removeItem('logged');
            localStorage.removeItem('idRol');
            window.location.href = "/";
        }
    }
}
</script>