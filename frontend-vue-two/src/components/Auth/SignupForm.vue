<template>
 <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <a href="" name="Groupomania" title="Groupomania" target="_blank">
                <v-img src="@/assets/icon-above-font.png" alt="Groupomania" contain height="200"></v-img>
              </a>
              <v-card-text>
                <v-form v-model="valid" @submit.prevent="onSubmitSignup" id="check-signup-form">
                  <v-text-field label="Entrer votre email" name="email" prepend-inner-icon="mdi-email" type="email" class="rounded-0" outlined></v-text-field>
                  <v-text-field label="Entrer votre pseudo" name="pseudo" prepend-inner-icon="mdi-account" type="text" class="rounded-0" outlined></v-text-field>
                  <v-text-field label="Entrer votre mot de passe" name="password" prepend-inner-icon="mdi-lock" type="password" class="rounded-0" outlined></v-text-field>
                  <!-- <v-text-field label="Re-enter password" name="password" prepend-inner-icon="mdi-lock-outline" type="password" class="rounded-0" outlined></v-text-field> -->
                  <v-btn class="rounded-0" color="#000000" x-large block dark>S'inscrire</v-btn>
                  <v-card-actions class="text--secondary">
                    <v-spacer></v-spacer>
                    <!-- <router-link :to="{ name: 'SignUp' }">Sign Up</router-link> -->
                    Déjà inscrit? <a href="#" class="pl-2" style="color: #000000">Se connecter</a>
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
    name: "SignupForm" ,
    data() {
      return {
        valid: true,
        email: "",
        emailRules: [
        v => !!v || "E-mail est obligatoire",
        v => /.+@.+/.test(v) || "L'email doit être valide",
        ],
        pseudo: "",
        nameRules: [
        v => !!v || "Le choix d'un pseudo est obligatoire",
        v => v.length <= 20 || "Le pseudo ne doit pas exceder 20 caractères",
        ],
        password: "",
        passwordRules: [
        v => !!v || "Le choix d'un mot de passe est obligatoire",
        v => v.length <= 20 || "Le mot de passe doit contenir 1 lettre majuscule, 1 lettre minuscule, 1 chiffre, 1 caractère spécial et doit faire au minimum 8 caractères",
        ],
      }

    },
    computed: {form() { return this.$refs.form }
    },
    methods: {
      onSubmitSignup() {
        if (this.form.validate()) {

        this.$emit('submit');
      }
      }
    }
}
</script>