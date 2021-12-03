<template>
  <v-card class="mx-auto" max-width="1000" tile>
      <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>
      <v-row style="margin:2.5%;position:absolute; top: 130px">

                  <v-list-item>
                   <v-list-item-avatar size="100">
                      <img src="avatar.png" alt="Avatar" class="avatar">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="title" style="margin-top:20px;">{{user.pseudo}}</v-list-item-title>
                      <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
    </v-row>
  </v-card>


<!-- Information sur votre profil
            // email pseudo 
            // role admin ou non
            // photo

            // suppression du compte
      

        
        <router-link to="/comments">Retour au chat</router-link> -->

  
</template>
<script>
import NavBar from '../components/Header.vue'
import Profile from '../components/Home/ProfileGetOne.vue'
import ProfilePicture from '../components/Home/ProfilePicture.vue'


export default {
    name: 'Profile',

    components: {
        Profile,
        ProfilePicture,
        NavBar
    },

    data() {
        return {
            // token d'identification 
        }
    }
}

</script>