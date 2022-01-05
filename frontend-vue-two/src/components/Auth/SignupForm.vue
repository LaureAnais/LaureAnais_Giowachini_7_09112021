<template>
 
  <v-form v-model="valid" @submit.prevent="onSubmitSignup" id="check-signup-form">
    <v-text-field label="Entrer votre email" name="email" prepend-inner-icon="mdi-email" type="email" class="rounded-0" outlined></v-text-field>
    <v-text-field label="Entrer votre pseudo" name="pseudo" prepend-inner-icon="mdi-account" type="text" class="rounded-0" outlined></v-text-field>
    <v-text-field label="Entrer votre mot de passe" name="password" prepend-inner-icon="mdi-lock" type="password" class="rounded-0" outlined></v-text-field>
    <!-- <v-text-field label="Re-enter password" name="password" prepend-inner-icon="mdi-lock-outline" type="password" class="rounded-0" outlined></v-text-field> -->
    <v-btn class="rounded-0" color="#000000" x-large block dark>S'inscrire</v-btn>
  </v-form>

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