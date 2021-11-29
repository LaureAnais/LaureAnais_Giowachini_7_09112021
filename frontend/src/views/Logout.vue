<template>
    <div>
        <h2>
            Se déconnecter
        </h2>
        <p>Vous allez être redirigé vers la page d'accueil.</p>
    </div>
</template>

<script>

localStorage.clear()
export default {
    created() {
       // setTime out pour rediriger vers la page d'accueil
    }
}
</script>

<style>
</style>