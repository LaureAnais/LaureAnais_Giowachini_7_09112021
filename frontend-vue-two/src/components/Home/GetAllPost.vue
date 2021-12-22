<template>
 <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <a href="" name="Groupomania" title="Groupomania" target="_blank">
                <v-img src="@/assets/icon-above-font.png" alt="Groupomania" contain height="50"></v-img>
              </a>
              <v-card-text>
                <v-form>
                  <v-text-field label="" name="" prepend-inner-icon="mdi-email" type="" class="rounded-0" outlined></v-text-field>
                  <v-text-field label="" name="pseudo" prepend-inner-icon="mdi-account" type="text" class="rounded-0" outlined></v-text-field>
                  <v-text-field label="" name="password" prepend-inner-icon="mdi-lock" type="password" class="rounded-0" outlined></v-text-field>
                  <v-card-actions class="text--secondary">
                    <v-spacer></v-spacer>
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