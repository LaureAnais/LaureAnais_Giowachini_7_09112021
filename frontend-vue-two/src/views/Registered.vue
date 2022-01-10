<template>
<div>
    <v-main>
        <v-tabs>
            <v-tab @click="CheckLogin = true">Se connecter</v-tab>
            <v-tab @click="CheckLogin = false">S'inscrire</v-tab>
        </v-tabs>

      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
               <a href="" name="Groupomania" title="Groupomania" target="_blank">
                <v-img src="@/assets/icon-above-font.png" alt="Groupomania" contain height="200"></v-img>
              </a>  
              <v-card-text>
                   <div v-if="CheckLogin">
                        <LoginForm v-on:onSubmitLogin="onSubmitLogin($event)"></LoginForm>
                   </div>
                    <div v-else>
                        <SignupForm/>
                    </div>
                  <v-card-actions class="text--secondary">
                    {{userlogin}}
                    <v-spacer></v-spacer>
                    <div v-if="CheckLogin" >
                         Pas encore inscrit?
                       <div @click="CheckLogin = false"> S'inscrire</div>
                    </div>  
                    <div v-else >
                        Déjà inscrit? 
                        <div  @click="CheckLogin = true">Se connecter</div>
    
                    </div>
                  </v-card-actions>
              </v-card-text>
              <v-card-actions class="ml-6 mr-6 text-center">
            <p>En continuant votre navigation, vous acceptez les termes et conditions <a href="#" class="pl-2" style="color: #000000">Infos légales</a> et <a href="#" class="pl-2" style="color: #000000">Contacts</a></p>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</div>

</template>

<script>

import SignupForm from "../components/Auth/SignupForm.vue"
import LoginForm from "../components/Auth/LoginForm.vue"
// import Header from '../components/Header.vue'

export default {
    name:"Registered",
    components: {
        SignupForm,
        LoginForm,
        // Header
    },
     data() {
        return { 
            CheckLogin: true,
            userlogin : "",
        //  pseudo: "",
        //  email: "",
        //  password: "",
        }
    },
    methods: {

    }
}
</script>