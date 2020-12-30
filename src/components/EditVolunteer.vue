<template>
<div id="app">
    <v-app>
        <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px" >
            <div>
                <v-tabs  v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
                    <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                    <v-icon >mdi-account</v-icon>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="firstName" label="First Name" maxlength="20" ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="lastName"  label="Last Name" maxlength="20" ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="phoneNumber" label="Phone" maxlength="9" type="number" ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="email" label="E-mail" ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field block v-model="verify" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show2 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show2 = !show2"></v-text-field>
                                        </v-col>
                                        <v-col align-center justify-center>
                                            <v-btn x-large block :disabled="!valid" color="error" @click="exitDialog">Salir</v-btn>
                                        </v-col>
                                        <v-col align-center justify-center>
                                            <v-btn x-large block :disabled="!valid" color="success" @click="editVolunteer">Editar</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-dialog>
    </v-app>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: "EditVolunteer",
    computed: {
        passwordMatch() {
            return () => this.password === this.verify || "Password must match";
        }
    },
    data: () => ({
        valid: true,
        tab: 0,
        tabs: [
            {name:"Edit User", icon:"mdi-account"}
        ],
        dialog: true,
        user: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        verify: "",
        phoneNumber: "",
        idUser: -1,
        show1: false,
        show2: false,
        rules: {
            required: value => !!value ,
            //min: v => (v && v.length >= 8) || "Min 8 characters"
            min: v => (v && v.length >= 8) || "Mínimo 8 caracteres"
        }
    }),
    methods: {
        editVolunteer(){
            localStorage.setItem('idUser', this.idUser);
            axios.get('http://localhost:8081/user/getById/'+this.idUser)
                 .then(response => (this.user = response.data))
            if(this.firstName != "" && this.lastName != ""){
                axios.put('http://localhost:8081/user/getById/'+this.idUser, {
                    "name":this.firstName+" "+this.lastName 
                })
            }
            else if(this.firstName != "" && this.lastName == ""){
                axios.put('http://localhost:8081/user/getById/'+this.idUser, {
                    "name":this.firstName + this.user.lastName
                })
            }
            else if(this.firstName == "" && this.lastName == ""){
                axios.put('http://localhost:8081/user/getById/'+this.idUser, {
                    "name":this.user.firstName + this.user.lastName
                })
            }
            else if(this.firstName == "" && this.lastName != ""){
                axios.put('http://localhost:8081/user/getById/'+this.idUser, {
                    "name":this.user.firstName + this.lastName
                })
            }
            if(this.email == ""){
                axios.put('http://localhost:8081/user/getById/'+this.idUser, {
                    "email":this.user.email
                })
            }
            else{
                axios.put('http://localhost:8081/user/getById/'+this.idUser, {
                    "email":this.email
                })
            }
            if(this.phoneNumber == ""){
                axios.put('http://localhost:8081/user/getById/'+this.idUser, {
                    "phone":this.user.phoneNumber
                })
            }
            else{
                axios.put('http://localhost:8081/user/getById/'+this.idUser, {
                    "phone":this.phoneNumber
                })
            }
            if(this.password == ""){
                axios.put('http://localhost:8081/user/getById/'+this.idUser, {
                    "password":this.user.password
                })
            }
            else{
                axios.put('http://localhost:8081/user/getById/'+this.idUser, {
                    "password":this.password
                })
            }
                
        }, 
        exitDialog() {
            window.location.href = "/volunteerView";
        }
    }

}
</script>