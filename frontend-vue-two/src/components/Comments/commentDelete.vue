// Créer un pop up pour modifier / supprimer Comment 

<template>
    <v-card-title class="mx-auto my-12" justify-space-around>
      <v-row>     
        <v-col cols="8" justify-space-around>
             {{comments.fk_users_comments.pseudo}}
         
        </v-col>
          
        <v-col cols="2">  
          <v-btn color="black" text type="submit"> 
            <v-icon
              medium
              class="mr-2"
              @click="editItem(post.id)"
            >
              mdi-pencil
            </v-icon>
          </v-btn>
        </v-col>


        <v-col cols="2">  
          <v-btn color="black" text type="submit"> 
            <v-icon
              medium
              @click="deleteItem(post.id)"
            >
              mdi-delete
            </v-icon>
          </v-btn>
        </v-col>
   
    </v-row>
    </v-card-title>

    <!-- <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
      </v-row>
        <div>
          <p class="text-left">
               {{ post.message }}
        </p>
        </div>
    </v-card-text> -->

</template>
<script>

// Lors de la modification (apparition popup ensuite on reprend le meme schema pour envoyer les infos au backend)

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
        // Modification location.reload ne fonctionne pas, il faut recharger la page manuellement pour faire fonctionner quelque chose

        .then(() => { 
          this.AddCommentToBack()
          this.commenttoback=""
          })
        .catch(function (error) {
                    console.log(error);
                })
      }, deleteItem (postId) {
        const token =  JSON.parse(localStorage.getItem("token")) 
        axios
            .delete(`http://localhost:3001/api/post/${postId}`, {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token.token}` 
                    } 
            }
            
                    )
            .then(() => {
                this.showPost()
                //reactualiser la page 
            })
            .catch(() => {})
      }     
    }
}


</script>

