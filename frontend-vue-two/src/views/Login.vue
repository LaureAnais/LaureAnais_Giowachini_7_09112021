<template>
    <LoginForm></LoginForm>
</template>

<script>
import axios from "axios"

import LoginForm from "../components/Auth/LoginForm.vue"

export default {
    name:"Login",
    components: {
        LoginForm
    },
     data() {
        return { 
            // valid: false,
            email: "",
            emailRules: [
            v => !!v || "Merci de renseigner votre email",
            ],
            pseudo: "",
            nameRules: [
                v => !!v || 'Merci de renseigner votre pseudo',
            ],
            password: "",
            passwordRules: [
            v => !!v || "Merci de renseigner votre mot de passe",
            ],
    
        }
    },
    methods: {
        onSubmitLogin: function() {
            const userlogin = {
                email: this.email,
                pseudo: this.pseudo,
                password: this.password
            }
            axios
                .post ("http://localhost:3000/api/users/login", userlogin)
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