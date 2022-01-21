<template>

<!-- Revenir à l'ancienne version !!!  -->
    <v-card-actions :id="postid"> 
      <v-form v-model="valid" @submit.prevent="AddCommentToBack(postid)">
          <v-row>
            <v-col cols="10">
                <v-text-field label="Ecrivez votre commentaire"  v-model="commenttoback" type="text" class="rounded-0" required
                clear-icon="mdi-close-circle"
                clearable

                @click:append-outer-icon="AddCommentToBack(postid)"
                
                >
                </v-text-field>
            </v-col>
            <v-col cols="1">
              <v-btn color="black" text type="submit"> 
                    <v-icon
                      medium
                      class="mr-2 sendPost"
                      @click="AddCommentToBack(postid)"
                    >
                      mdi-send
                    </v-icon>
                </v-btn> 
            </v-col>
      
          </v-row>
      </v-form>
      
    </v-card-actions>

</template>

<script>
// Ajouter editItem au script pour le rendre actif 
import axios from "axios"
export default {
     name: "" ,
     newComment:"",
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
        // Modification location.reload ne fonctionne pas, il faut recharger la page manuellement pour faire fonctionner quelque chose

        .then(() => { 
          this.$emit("SenttoPost", false)
          this.commenttoback=""
          })
        .catch(function (error) {
                    console.log(error);
                })
      }
    }
}
</script>