<template>
 <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <a href="" name="Groupomania" title="Groupomania" target="_blank">
                <v-img src="@/assets/icon-above-font.png" alt="Groupomania logo" contain height="200"></v-img>
              </a>
              <v-card-text>
                <v-form ref="form"
                v-model="valid"
                @submit.prevent="onSubmitLogin" id="check-login-form">
                  <v-text-field label="Votre email" name="email" prepend-inner-icon="mdi-email" type="email" class="rounded-0" outlined></v-text-field>
                  <v-text-field label="Votre mot de passe" name="password" prepend-inner-icon="mdi-lock" type="password"  class="rounded-0" outlined></v-text-field>
                  <v-btn class="rounded-0" color="#000000" x-large block dark>Se connecter</v-btn>
                  <v-card-actions class="text--secondary">
        
                    <v-spacer></v-spacer>
                    Pas encore inscrit?<a href="#" class="pl-2" style="color: #000000"></a>
                    <router-link :to="{ name: 'Registered' }">S'inscrire</router-link>
                  </v-card-actions>
                </v-form>
              </v-card-text>
              <v-card-actions class="ml-6 mr-6 text-center">
                <p>En continuant votre navigation, vous acceptez les termes et conditions <a href="#" class="pl-2" style="color: #000000">Infos légales</a> et <a href="#" class="pl-2" style="color: #000000">Contacts</a></p>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
    name: "LoginForm" ,
    data() {
      return {
      // valid: false,
        email: "",
        emailRules: [
        v => !!v || "Merci de renseigner votre email",
        ],
        password: "",
        passwordRules: [
        v => !!v || "Merci de renseigner votre mot de passe",
        ],
    
      }
    },
    computed:  {form() { return this.$refs.form }
    },
    methods: {
      onSubmitLogin() {
        if (this.form.validate()) {

        this.$emit('submit');
      }
      }
    }
}
</script>