<script>
import loginForm from '../components/loginForm.ce.vue'
export default {
    name: "Home",
    components: {
        loginForm,
    }, 
    data() {
        return {
            userId: localStorage.getItem("userId")
        }
    },
    methods: {
        
        
    }
}
</script>

<style>
</style>