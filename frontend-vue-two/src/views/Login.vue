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
            axios
                .post ("http://localhost:3000/api/users/login", {
                    // email: ,
                    // pseudo: ,
                    // password: ,
                })
                .then (response => {console.log(response)})
                .catch (err => {console.log(err)})
        }
    }
}
</script>