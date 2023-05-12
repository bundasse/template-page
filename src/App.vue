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
  mounted() {
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
