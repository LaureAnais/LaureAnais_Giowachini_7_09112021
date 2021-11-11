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
        <button
        @click="Signup">
            S'inscrire
        </button>
       
    </div>
</template>

<script>
import AuthenticationService from "../services/AuthentificationService";

export default {
    async signup() {
    const response = await AuthenticationService.signup ({
            email: this.email,
            pseudo: this.pseudo,
            password: this.password
        })
    }
    
    }

</script>
<style>
</style>