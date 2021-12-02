<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

      <v-text-field
      v-model="name"
      :counter="20"
      :rules="nameRules"
      label="Pseudo"
      required
    ></v-text-field>
    
    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Mot de passe à renseigner']"
      label="Mot de passe"
      required
    ></v-select>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'Rester connecté!']"
      label="Rester connecté?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
    </v-btn>
  </v-form>
</template>

<script>
export default {
    name: "Login"
}
</script>