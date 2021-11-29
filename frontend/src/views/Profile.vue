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
import profileData from '../components/profileData.ce.vue'
import NavBar from '../components/navBar.ce.vue'

export default {
    name: 'Profile',

    components: {
        profileData,
        NavBar
    },

    data() {
        return {
            // token d'identification 
        }
    }
}

</script>