//Login.vue

<template>
    <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <a href="" name="" title="" target="_blank">
                <v-img src="" alt="" contain height="200"></v-img>
              </a>
              <v-card-text>
                <v-form>
                  <v-text-field label="Enter your email" name="email" prepend-inner-icon="mdi-email" type="email" class="rounded-0" outlined></v-text-field>
                  <v-text-field label="Enter your pseudo" name="pseudo" prepend-inner-icon="mdi-pseudo" type="pseudo" class="rounded-0" outlined></v-text-field>
                  <v-text-field label="Enter your password" name="password" prepend-inner-icon="mdi-lock" type="password" suffix="| Oublié?" class="rounded-0" outlined></v-text-field>
                  <v-btn class="rounded-0" color="#000000" x-large block dark>Se connecter</v-btn>
                  <!-- <v-card-actions class="text--secondary">
                    <v-checkbox color="#000000" label="Remember me"></v-checkbox>
                    <v-spacer></v-spacer>
                    <router-link :to="{ name: 'Registered' }">Sign Up</router-link>
                    Pas encore inscrit? <a href="#" class="pl-2" style="color: #000000">S'inscrire</a>
                  </v-card-actions> -->
                </v-form>
              </v-card-text>
              <v-card-actions class="ml-6 mr-6 text-center">
                <p>En continuant la navigation sur cette page, vous acceptez les termes et conditions du chat Groupomania <a href="#" class="pl-2" style="color: #000000">Policy</a> and <a href="#" class="pl-2" style="color: #000000">Terms of Use</a></p>
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
    name: "Registered" ,
    data () {

    }
}

</script>
<style>

</style>
