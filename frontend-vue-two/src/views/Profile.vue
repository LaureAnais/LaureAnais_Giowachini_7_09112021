<template>
    <div>
        <NavBar></NavBar>
        <Profile></Profile>
        <h2>
            Information sur votre profil
        </h2>

        <router-link to="/comments">Retour au chat</router-link>
    </div>
</template>

<script>

// import axios from 'axios'
import NavBar from '../components/Header.vue'
import Profile from '../components/Home/ProfileGetOne.vue'
//import ProfilePicture from '../components/Home/ProfilePicture.vue'


export default {
    name: 'Profile',

    components: {
        Profile,
        //ProfilePicture,
        NavBar
    },

    data() {
        return {
            // token d'identification 
        }
    }
}

</script>

<style>
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>