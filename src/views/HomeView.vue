<template>
  <div>
     <Banner/>
     <div class="max-w-7xl mx-auto px-[2%] flex flex-wrap">
       <HomeCompany />
       <HomeContents />
       <HomeManagement/>
     </div>
  </div>
  <HomeDifferent/>
  <HomeOnline/>
</template>

<script>
// @ is an alias to /src
import Banner from '@/components/Home/HomeBanner.vue'
import HomeCompany from '@/components/Home/HomeCompany.vue'
import HomeContents from '@/components/Home/HomeContents.vue'
import HomeDifferent from '@/components/Home/HomeDifferent.vue'
import HomeManagement from '@/components/Home/HomeManagement.vue'
import HomeOnline from '@/components/Home/HomeOnline.vue'
export default {
  name: 'HomeView',
  components:{
    Banner,
    HomeCompany,
    HomeContents,
    HomeDifferent,
    HomeManagement,
    HomeOnline
  }
}
</script>
