<template>
        <v-main>
      <v-container>
        <v-tabs>
          <v-tab @click="LoginForm = true">Se connecter</v-tab>
          <v-tab @click="SignupForm = true; LoginForm = false">S'inscrire</v-tab>
        </v-tabs>
        <div>
          <Login v-if="LoginForm"/>
          <Register v-if="SignupForm"/>
        </div>
      </v-container>
    </v-main>
</template>

<script>
 export default {
     name: 'Header', 
     data() {
         return {
            LoginForm: true,
            SignupForm: false
         }
     }
 }
</script>