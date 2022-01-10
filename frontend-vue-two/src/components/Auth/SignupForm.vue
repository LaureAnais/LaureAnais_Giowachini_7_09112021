<template>
 
  <v-form v-model="valid" @submit.prevent="onSubmitSignup" id="check-signup-form">
    <v-text-field label="Entrer votre email" v-model="email" prepend-inner-icon="mdi-email" type="email" :rules="formRules" class="rounded-0" outlined required></v-text-field>
    <v-text-field label="Entrer votre pseudo" v-model="pseudo" prepend-inner-icon="mdi-account" type="text" :rules="formRules" class="rounded-0" outlined required></v-text-field>
    <v-text-field label="Entrer votre mot de passe" v-model="password" prepend-inner-icon="mdi-lock" type="password" :rules="formRules" class="rounded-0" outlined required></v-text-field>
    <v-btn class="rounded-0" color="#000000" x-large block dark type="submit">S'inscrire</v-btn>
  </v-form>

</template>

<script>
import axios from "axios"
export default {
    name: "SignupForm" ,
    data() {
      return {
        valid: true,
        email: "",
        pseudo: "",
        password: "",
        formRules: [
                v => !!v || "Merci de compléter le formulaire",
                ],
      }

    },
    computed: {form() { return this.$refs.form }
    },
    methods: {
       onSubmitSignup: function() {
            console.log('onSubmitSignup')
          const user = {
                email: this.email,
                pseudo: this.pseudo,
                password: this.password
            }
            axios
                .post ("http://localhost:3001/api/user/signup", user, 
                {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }
                )
                .then(() => {axios
                .post ("http://localhost:3001/api/user/login", user,
                {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                })
                .then(res => {
                    // JSON Stringify nécessaire ou res.data.token ??
                    localStorage.setItem('token', JSON.stringify(res.data))
                    localStorage.setItem('userId', res.data.userId)
                    this.$router.push('/')
                    })
                .catch(function (error) {
                    console.log(error);
                })
        
        }) 
    }
}};
</script>