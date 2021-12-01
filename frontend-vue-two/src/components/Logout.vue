<template>
    <div class="row">
            <h2>Déconnection</h2>
            <p>Vous allez être redirigé vers la page d'accueil dans 5 secondes.</p>
    </div>
</template> 

<script>
localStorage.clear()
export default {
    created() {
        setTimeout(() => this.$router.push({ path: '/' }), 5000);
    }
}
</script>

<style>
</style>