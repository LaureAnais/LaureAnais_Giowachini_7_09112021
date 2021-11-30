<template>
    <div>
    <h2>Bienvenu chez Groupomania</h2>
    <p>Merci de vous inscrire</p> 
    <Signup></Signup> 
    </div> 
</template>

<script>
import axios from "axios" 
import Signup from "../components/Auth/SignupForm.vue"

export default {  
    name: 'Registered',
    components: {
        Signup
    },
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
