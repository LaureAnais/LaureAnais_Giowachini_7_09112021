<template>
    <Signup></Signup>
</template>

<script>
import axios from "axios"
import Signup from "../components/Auth/Signup.vue"
export default {
    name:"Registered",
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