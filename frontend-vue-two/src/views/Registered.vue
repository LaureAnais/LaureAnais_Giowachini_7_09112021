<template>
    
</template>

<script>
import axios from "axios"
export default {
    name:"Registered",
    components: {
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