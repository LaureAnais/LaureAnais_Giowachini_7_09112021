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