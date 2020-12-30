<template>
  <v-dialog v-if="show" persistent v-model="msg" max-width="600px" min-width="360px">
      <div>
          <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
              <v-tabs-slider color="purple darken-4"></v-tabs-slider>
              <v-tab v-for="(tab, i) in tabs" :key="i">
                  <v-icon large>{{ tab.icon }}</v-icon>
                  <div class="caption py-1">{{ tab.name }}</div>
              </v-tab>
              <v-tab-item>
                  <v-card class="px-4" v-if = "show">
                      <v-card-text>
                          <v-form ref="loginForm" v-model="valid" lazy-validation>
                              <v-row>
                                  <v-col cols="12">
                                      <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="Email" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                      <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password"  counter @click:append="show1 = !show1"></v-text-field>
                                  </v-col>
                                  <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                  </v-col>
                                  <v-spacer></v-spacer>
                                  <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                      <v-btn x-large block :disabled="!valid" color="success" @click="validate"> Login </v-btn>
                                  </v-col>
                              </v-row>
                          </v-form>
                      </v-card-text>
                  </v-card>
              </v-tab-item>
              <v-tab-item>
                  <v-card class="px-4">
                      <v-card-text>
                          <v-form ref="registerForm" v-model="valid" lazy-validation>
                              <v-row>
                                  <v-col cols="12" sm="6" md="6">
                                      <v-text-field v-model="firstName"
                                       :rules="[rules.required]" 
                                       label="First Name" 
                                       maxlength="20" 
                                       required
                                       @input="$v.firstName.$touch()"
                                       @blur="$v.firstName.$touch()"
                                       ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                      <v-text-field v-model="lastName" :rules="[rules.required]" label="Last Name" maxlength="20" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                      <v-text-field v-model="phoneNumber" :rules="phoneRules" label="Phone" maxlength="9" type="number" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                      <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" counter @click:append="show1 = !show1"></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                      <v-text-field block v-model="verify" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                                  </v-col>
                                  <v-spacer></v-spacer>
                                  <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                      <v-btn x-large block :disabled="!valid" color="success" @click="registerVolunteer">Register</v-btn>
                                  </v-col>
                              </v-row>
                          </v-form>
                      </v-card-text>
                  </v-card>
              </v-tab-item>
          </v-tabs>
      </div>
  </v-dialog>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Login',
  props: {
    msg: Boolean
  },
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
    data: () => ({
    dialog: true,
    idRol: null,
    tab: 0,
    tabs: [
        {name:"Login", icon:"mdi-account"},
        {name:"Register", icon:"mdi-account-outline"}

    ],
    valid: true,
    user: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: null,
    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",

    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    phoneRules: [
      v => !!v || "Required",
    ],
    show: true,
    show1: false,
    show2: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
      // max: v => (v && v.length <= 8) || "Max 8 characters"
    },
    logged: 0
  }),

  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        axios.post('http://localhost:8081/user/logIn', {
          "mail":this.loginEmail,
          "password":this.loginPassword,
          "invisible":0,
          })
          
      .then( response => {
        this.user = response.data;
        console.log(this.user);
        //Login fail
        if (this.idRol === 2 || this.idRol === null){
            this.logged = false;
            this.msg = false;
            localStorage.removeItem('logged');
            localStorage.removeItem('idRol');
            this.$router.push("/");
        //Login Volunteer
        }else if(this.idRol === 1){
          localStorage.setItem('logged', true)
          localStorage.setItem('idRol',this.idRol)
          this.logged = true;
          this.msg = false;
          this.$emit('logged', this.logged);
          this.show = false;
          this.$router.push("/");
        //Login Admin
        }else{
          localStorage.setItem('logged', true)
          localStorage.setItem('idRol',this.idRol)
          this.logged = true;
          this.msg = false;
          this.$emit('logged', this.logged);
          this.show = false;
          this.$router.push("/adminView");

        }
      })
      .catch( e=> console.log(e))
      }
    }, 
    registerVolunteer(){
      if (this.$refs.registerForm.validate()) {
        axios.post('http://localhost:8081/user/createUser/', 
        {"name":this.firstName+" "+this.lastName,
          "mail":this.email,
          "phone":12345,
          "idRol":1,
          "password":this.password,
          "invisible":0})
      .then( response => {
        this.user = response.data;
        this.logged = true;
        this.msg = false;
        this.$emit('logged', this.logged);
      })
      .catch( e=> console.log(e))
      }
    }
  }
}
</script>