<template>
      <v-form ref="form"
      v-model="valid"
      @submit.prevent="onSubmitLogin" id="check-login-form">
        <v-text-field label="Votre email" v-model="email" prepend-inner-icon="mdi-email" type="email" :rules="formRules" class="rounded-0" outlined required></v-text-field>
        <v-text-field label="Votre mot de passe" v-model="password" prepend-inner-icon="mdi-lock" type="password" :rules="formRules" class="rounded-0" outlined required></v-text-field>
        <v-btn class="rounded-0" color="#000000" x-large block dark type="submit" >Se connecter</v-btn>
      </v-form>
</template>

<script>
import axios from "axios"
export default {
    name: "LoginForm" ,
    data() {
      return {
      valid: true,
        email: "",
        password: "",
        formRules: [
        v => !!v || "Merci de compléter le formulaire",
        ],
      }
    },
    computed:  {form() { return this.$refs.form }
    },
    methods: {
      onSubmitLogin: function() {
            const userlogin = {
              email: this.email,
              password: this.password
            }
            axios
                .post ("http://localhost:3001/api/user/login", userlogin)
                .then(res => {
                    // JSON Stringify nécessaire ou res.data.token ??
                    localStorage.setItem('token', JSON.stringify(res.data))
                    localStorage.setItem('userId', res.data.userId)
                    this.$router.push()
                    })
                .catch(function (error) {
                    console.log(error);
                });
        }
      }
}
</script>