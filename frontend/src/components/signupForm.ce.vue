<template>

<b-container>
    <b-row class="justify-content-md-center mt-4">
        <b-col col md="8">
            <b-card 
            header="Groupomania app"
            header-bg-variant="primary"
            header-text-variant="white"
            > 
            </b-card>
            <b-card-text>
                <b-form @submit="onSubmit"> 
                    <b-form-group
                    description="Enter your email"
                    label="email"
                    >
                 <b-form-input v-model="email" required></b-form-input>   
                    </b-form-group>
                </b-form>
            </b-card-text>

            <b-card-text>
                <b-form @submit="onSubmit">
                    <b-form-group
                    description="Enter your pseudo"
                    label="pseudo"
                    >
                 <b-form-input v-model="pseudo" type="pseudo" required></b-form-input>   
                    </b-form-group>
                </b-form>
            </b-card-text>

            <b-card-text>
                <b-form @submit="onSubmit">
                    <b-form-group
                    description="Enter your password"
                    label="password"
                    >
                 <b-form-input v-model="password" type="password" required></b-form-input>   
                    </b-form-group>

                    <b-form-group>
                      <b-button type="submit" variant="outline-primary" : disabled="acceptableSubmittion">S'inscrire</b-button>
                    </b-form-group>
                </b-form>
            </b-card-text>
        </b-col>
    </b-row>
</b-container> 
</template>

<script>
//import axios from "axios";

export default {
    name: 'signup' ,
    data() {
        return {
            email: '',
            pseudo: '',
            password: ''
        }
    },
    methods: {
      onsubmit(event) {
        event.preventDefault()
        alert(this.email + ' ' + this.pseudo + ' ' + this.password)
      }
    }, 
    computed: {
      acceptableSubmittion() {
        return this.email.length > 0 && this.pseudo.length > 0 && this.password.length > 0 ? false : true
      }
    }
}

</script>
<style scoped>
.error {
    color: red;
}
</style>

