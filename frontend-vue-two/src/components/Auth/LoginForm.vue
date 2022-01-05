<template>
      <v-form ref="form"
      v-model="valid"
      @submit.prevent="onSubmitLogin" id="check-login-form">
        <v-text-field label="Votre email" name="email" prepend-inner-icon="mdi-email" type="email" class="rounded-0" outlined></v-text-field>
        <v-text-field label="Votre mot de passe" name="password" prepend-inner-icon="mdi-lock" type="password"  class="rounded-0" outlined></v-text-field>
        <v-btn class="rounded-0" color="#000000" x-large block dark>Se connecter</v-btn>
      </v-form>
</template>

<script>
export default {
    name: "LoginForm" ,
    data() {
      return {
      // valid: false,
        email: "",
        password: "",
        formRules: [
        v => !!v || "Merci de compléter le formulaire",
        ],
      }
    },
    computed:  {form() { return this.$refs.form }
    },
    methods: {
      onSubmitLogin() {
        if (this.form.validate()) {

        this.$emit('submit');
      }
      }
    }
}
</script>