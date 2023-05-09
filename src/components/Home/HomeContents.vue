<template lang="">
    <div class="basis-full mt-24 text-center mb-5">
            <h3 class="text-2xl font-bold mb-4">컨텐츠 제목 구간</h3>
            <p class="text-sm text-gray-400">컨텐츠 설명 구간</p>
    </div>
    <div class="basis-full flex flex-wrap justify-between">
        <div class="basis-full sm:basis-[48.5%] lg:basis-[23.5%] relative mb-3 sm:mb-5 lg:mb-0" v-for="e in data" :key="e">
            <img :src="e.img" :alt="e.title" class="w-full">
            <div class="py-4 bg-white/20 px-5 text-center absolute bottom-0">
                <h3 class="font-bold mb-2">{{e.title}}</h3>
                <p class="line-clamp-3 lg:line-clamp-2">{{e.desc}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import data from '../../assets/Data.json'
export default {
    name:"HomeContents",
    data() {
        return {
            data: data.Content_1
        }
    },
}
</script>
<style lang="">
    
</style>