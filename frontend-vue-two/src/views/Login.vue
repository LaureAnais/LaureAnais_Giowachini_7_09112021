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
           
        }
    },
    methods: {
        onSubmitLogin: function() {
            const userlogin = {
                email: this.email,
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