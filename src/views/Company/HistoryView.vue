<template lang="">
        <div class="py-24 pt-48 text-center basis-full">
        <h3 class="text-3xl font-bold relative mb-5 after:absolute after:h-0.5 after:w-16 after:bg-slate-800 after:-bottom-2 after:left-2/4 after:-translate-x-2/4">{{title[1]}}</h3>
        <p class="text-gray-400">{{desc[1]}}</p>
    </div>
    <div class="pb-24 basis-full relative after:absolute after:h-full sm:after:w-0.5 after:bg-gray-300 after:left-2/4 after:top-0 after:-translate-x-2/4">
        <div class="group flex justify-start odd:justify-end sm:text-right odd:text-left after:absolute sm:after:w-4 after:h-4 sm:after:border-2 after:bg-white after:rounded-full after:left-2/4 after:-translate-x-2/4 after:border-slate-600 after:top-3 hover:after:bg-slate-800 after:z-50 after:transition-all after:duration-700 relative" v-for="e in dataList.slice().reverse()" :key="e">
            <div class="basis-full sm:basis-[47%] mb-12">
                <h3 class="text-gray-400 transition-all duration-700 text-4xl mb-4 font-bold group-hover:text-black">{{e.year}}</h3>
                <p class="font-normal">{{e.title}}</p>
                <p class="font-normal">{{e.desc}}</p>
                <img class="inline-block mt-5" :src="e.img" :alt="e.title" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"HistoryView",
    props:{title: Array , desc:Array},
    data() {
        return {
            dataList:[
                {
                    year: "2015",
                    title: "설립 12주년",
                    desc: "창립 12주년 기념해입니다.",
                    img: "https://via.placeholder.com/500x120"
                },
                {
                    year: "2016",
                    title: "설립 13주년",
                    desc: "창립 13주년 기념해입니다.",
                    img: "https://via.placeholder.com/500x120"
                },
                {
                    year: "2017",
                    title: "설립 14주년",
                    desc: "창립 14주년 기념해입니다.",
                    img: "https://via.placeholder.com/500x120"
                },
                {
                    year: "2018",
                    title: "설립 15주년",
                    desc: "창립 15주년 기념해입니다.",
                    img: "https://via.placeholder.com/500x120"
                },
                {
                    year: "2019",
                    title: "설립 16주년",
                    desc: "창립 16주년 기념해입니다.",
                    img: "https://via.placeholder.com/500x120"
                },
                {
                    year: "2020",
                    title: "설립 17주년",
                    desc: "창립 17주년 기념해입니다.",
                    img: "https://via.placeholder.com/500x120"
                },
                {
                    year: "2021",
                    title: "설립 18주년",
                    desc: "창립 18주년 기념해입니다.",
                    img: "https://via.placeholder.com/500x120"
                },
                {
                    year: "2022",
                    title: "설립 19주년",
                    desc: "창립 19주년 기념해입니다.",
                    img: "https://via.placeholder.com/500x120"
                },
                {
                    year: "2023",
                    title: "설립 20주년",
                    desc: "창립 20주년 기념해입니다.",
                    img: "https://via.placeholder.com/500x120"
                },
            ]
        }
    },
}
</script>
<style lang="">
    
</style>