<template>
    <div class="lg:block hidden basis-2/4">
        <img src="https://via.placeholder.com/650x620" alt="전경사진" class="w-full">
    </div>
    <div class="basis-full lg:basis-2/4 flex flex-wrap">
        <div v-for="e in contents" :key="e" class="basis-2/4 p-12 [&:nth-child(3n+1)]:bg-slate-50 relative group">
            <h3 class="text-2xl font-bold">{{ e.title }}</h3>
            <p class="my-4">{{ e.desc }}</p>
            <font-awesome-icon :icon="e.icon" class="absolute right-4 bottom-4 sm:right-12 sm:bottom-12 text-2xl sm:text-4xl text-black/30 transition-all duration-700 group-hover:rotate-y-360"/>
        </div>
    </div>
        
    
</template>
<script>
import data from '../../assets/Data.json';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
export default {
    name:"HomeCompany",    
    data() {
        return {
            contents : data.CompanyInfo
        }
    },
    components: {
        faFontAwesome
    }
}
</script>
<style>
    
</style>