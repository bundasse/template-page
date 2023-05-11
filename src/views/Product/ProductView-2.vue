<template lang="">
    <div class="py-24 pt-48 text-center basis-full">
        <h3 class="text-3xl font-bold relative mb-5 after:absolute after:h-0.5 after:w-16 after:bg-slate-800 after:-bottom-2 after:left-2/4 after:-translate-x-2/4">{{title[1]}}</h3>
        <p class="text-gray-400">{{desc[1]}}</p>
    </div>
    <ul class="flex gap-2 mb-10 w-full flex-wrap">
        <li v-for="e in dataList" :key="e" class="p-5 border rounded-lg basis-full lg:basis-[49%] flex flex-wrap">
            <h3 class="text-2xl font-bold basis-1/3">{{e.name}}</h3>
            <p class="basis-2/3 px-5">{{e.desc}}</p>
            <p class="basis-full text-right text-lg font-bold">{{e.price}}원</p>
        </li>
    </ul>
</template>
<script>
import {db} from '../../firebase';
export default {
    name:"ProductView-2",
    props:{title: Array , desc:Array},
    data() {
        return {
            dataList:[]
        }
    },
    mounted() {
        // db.콜렉션("db이름").get().then((데이터)=>{반복문 실행})
        db.collection("product").get().then((data)=>{
            data.forEach((e)=>{
                this.dataList.push(e.data())
            })
        })
    },   
}
</script>
<style lang="">
    
</style>