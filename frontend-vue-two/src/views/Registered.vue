<template>
<div>
    <v-main>
      <v-container>
            <v-tabs>
            <v-tab @click="LoginFormHeader = true">Se connecter</v-tab>
            <v-tab @click="LoginFormHeader = false">S'inscrire</v-tab>
            </v-tabs>
      </v-container>
      <v-container>
        <div v-if="LoginFormHeader">
            <LoginForm/>
        </div>
        <div v-else>
            <SignupForm/>
        </div>
      </v-container>
    </v-main>
</div>

</template>

<script>
import axios from "axios"
import SignupForm from "../components/Auth/SignupForm.vue"
import LoginForm from "../components/Auth/LoginForm.vue"
// import Header from '../components/Header.vue'

export default {
    name:"Registered",
    components: {
        SignupForm,
        LoginForm,
        // Header
    },
     data() {
        return { 
            LoginFormHeader: true,
        //  pseudo: "",
        //  email: "",
        //  password: "",
        }
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
                .post ("http://localhost:3000/api/users/signup", 
                JSON.stringify(user), 
                {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }
                )
                .then(() => { this.$router.push('/registered')})
                .catch(() => {this.errorAlert = true})
        }
    }
}
</script>