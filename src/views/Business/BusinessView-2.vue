<template lang="">
    <div class="py-24 pt-48 text-center basis-full">
        <h3 class="text-3xl font-bold relative mb-5 after:absolute after:h-0.5 after:w-16 after:bg-slate-800 after:-bottom-2 after:left-2/4 after:-translate-x-2/4">{{title[1]}}</h3>
        <p class="text-gray-400">{{desc[1]}}</p>
    </div>
    <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
        <div class="basis-full border rounded mb-5 flex flex-wrap" v-for="e in dataList" :key="e">
            <div class="basis-full sm:basis-3/5">
                <img :src="e.img" :alt="e.title" class="w-full p-2.5">
            </div>
            <div class="basis-full sm:basis-2/5 pl-20 box-border">
                <h3 class="py-5 font-bold">{{e.title}}</h3>
                <p class="pb-5">{{e.desc}}</p>                        
                <router-link to="/service/online" class="px-5 py-2 text-white bg-slate-800 hover:bg-slate-500 rounded-md inline-block mb-5">온라인 견적 문의</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "BusinessView2",
    props:{title: Array , desc:Array},
    data() {
        return {
            dataList:[
                { 
                title:"홈페이지 제작 1",
                desc:"홈페이지 관련 설명",
                img:"https://via.placeholder.com/700x350"
                },
                { 
                title:"홈페이지 제작 2",
                desc:"홈페이지 관련 설명",
                img:"https://via.placeholder.com/700x350"
                },
                { 
                title:"홈페이지 제작 3",
                desc:"홈페이지 관련 설명",
                img:"https://via.placeholder.com/700x350"
                },
                { 
                title:"홈페이지 제작 4",
                desc:"홈페이지 관련 설명",
                img:"https://via.placeholder.com/700x350"
                }
            ]
        }
    }, 
}
</script>
<style lang="">
    
</style>