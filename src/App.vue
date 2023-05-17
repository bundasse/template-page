<template>
  <Navi />
  <router-view/>
  <Footer />
</template>

<script>
import {auth} from './firebase'
import Navi from './components/NaviCom.vue'
import Footer from './components/FooterCom.vue'
export default{
  name:"AppPage",
  components: {
    Navi,
    Footer
  },
  data() {
    return {
      displayName: sessionStorage.getItem("displayName"),
      uid: sessionStorage.getItem("uid")
    }
  },
  mounted() {

    if(sessionStorage.getItem("refreshToken")){
      this.$store.commit('loginState',{displayName : this.displayName, uid: this.uid})
    }
    auth.onAuthStateChanged((user)=>{
      if (user) {
        this.$store.commit('loginState',{displayName : user.displayName, uid: user.uid})
      }
    })
  },
}
</script>
<style>
</style>
