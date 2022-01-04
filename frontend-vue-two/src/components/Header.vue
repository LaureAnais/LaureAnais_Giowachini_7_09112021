<template>
        <v-main>
      <v-container>
        <v-tabs>
          <v-tab @click="LoginFormHeader = true">Se connecter</v-tab>
          <v-tab @click="LoginFormHeader = false">S'inscrire</v-tab>
        </v-tabs>
        <div v-if="LoginFormHeader">
          <LoginForm/>
        </div>
        <div v-else>
          <SignupForm/>
        </div>
      </v-container>
    </v-main>
</template>

<script>
 import LoginForm from './Auth/LoginForm.vue'
 import SignupForm from './Auth/SignupForm.vue'
 export default {
  components: { LoginForm , SignupForm },
  name: 'Header', 
  data() {
      return {
          LoginFormHeader: true
      }
  }
 }
</script>