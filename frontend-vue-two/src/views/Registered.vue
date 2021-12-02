<template>
    <SignupForm></SignupForm>
</template>

<script>
import axios from "axios"
import SignupForm from "../components/Auth/SignupForm.vue"
export default {
    name:"Registered",
    components: {
        SignupForm
    },
     data() {
        return { 
            valid: false,
            email: "",
            emailRules: [
            v => !!v || "E-mail est obligatoire",
            v => /.+@.+/.test(v) || "L'email doit être valide",
            ],
            pseudo: "",
            nameRules: [
            v => !!v || "Le choix d'un pseudo est obligatoire",
            v => v.length <= 20 || "Le pseudo ne doit pas exceder 20 caractères",
            ],
            password: "",
            passwordRules: [
            v => !!v || "Le choix d'un mot de passe est obligatoire",
            v => v.length <= 20 || "Le mot de passe doit contenir 1 lettre majuscule, 1 lettre minuscule, 1 chiffre, 1 caractère spécial et doit faire au minimum 8 caractères",
            ],
    
        }
    },
    methods: {
        onSubmitSignup: function() {
          const user = {
                email: this.email,
                pseudo: this.pseudo,
                password: this.password
            }
            axios
                .post ("http://localhost:3000/api/users/signup", user)
                .then (response => {console.log(response)})
                .catch (err => {console.log(err)})
        }
    }
}
</script>