<template>
    <v-card-actions :id="postid"> 
      <v-form v-model="valid" @submit.prevent="AddCommentToBack(postid)">
        <v-text-field label="Ecrivez votre commentaire"  v-model="commenttoback" type="text" class="rounded-0" required>

        </v-text-field>
        <v-btn color="red darken-2" ml=2 text type="submit"> Valider
        </v-btn>
      </v-form>
      
    </v-card-actions>

</template>

<script>
import axios from "axios"
export default {
     name: "" ,
     props: ["postid"],
    data() {
      return {
        valid: true,
        commenttoback: "",
      }

    },
    computed: {form() { return this.$refs.form }
    },
    methods: {
         AddCommentToBack (id_posts) {
        const token =  JSON.parse(localStorage.getItem("token"))   
        const commentToBack = {
            message: this.commenttoback,
            id_posts : id_posts
        }
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)

        axios
        .post("http://localhost:3001/api/comment", commentToBack,  
        {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token.token}` 
                    }
            }
        
        )
        // Revoir location.reload pour avoir le même résultat que le post 
        .then(() => { location.reload()})
        .catch(function (error) {
                    console.log(error);
                })
      },
    }
}
</script>
