<template>
    <div>
        <h1>Bienvenue sur le chat Groupomania, merci de vous inscrire </h1>

        <input 
        type="email"
        name="email"
        v-model='email'
        placeholder="email"/>
        <br>
        <input 
        type="pseudo"
        name="pseudo"
        v-model='pseudo'
        placeholder="pseudo"/>
        <br>
        <input 
        type="password"
        name="password"
        v-model='password'
        placeholder="password"/>
        <br>
        <div class="error" v-html="error"/>
        <br>
        <button
        @click="Signup">
            S'inscrire
        </button>
       
    </div>
</template>

<script>
import AuthenticationService from "@/services/AuthentificationService"

export default {
    data() {
        return {
            email: '',
            pseudo: '',
            password: ''
        }
    },
    methods: {
        async signup () {
            try {
                await AuthenticationService.signup({
                    email: this.email,
                    pseudo: this.pseudo,
                    password: this.password
                })
            } catch (error) {
                this.error = error.response.data.error
            }
        }
    }
}

</script>
<style scoped>
.error {
    color: red;
}
</style>