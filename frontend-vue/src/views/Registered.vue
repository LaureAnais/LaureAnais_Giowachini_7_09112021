<template>
    <div>page ou je peux m'enregistrer + m'inscrire 
// page qui ira chercher les componentes de s'inscire / se loguer</div> 
</template>

<script>
import axios from "axios" 
export default {  
    name: Registered,
    data() {
        return { 
            email: "",
            pseudo: "",
            password: ""
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
