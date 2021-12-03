<template>
  <v-form v-model="valid" @submit.prevent="onSubmitSignup" id="check-signup-form">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="pseudo"
            :rules="nameRules"
            :counter="20"
            label="Pseudo"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            type= "submit">
        
            Valider
          </v-btn>

        </v-col>
      </v-row>
    </v-container>
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