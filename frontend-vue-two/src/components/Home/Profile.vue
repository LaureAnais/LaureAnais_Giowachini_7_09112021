<template>
<!-- NavBar -->
    <div>
        <h2>
            Information sur votre profil
        </h2>

        <router-link to="/comments">Retour au chat</router-link>
    </div>
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