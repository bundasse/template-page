<template>
    <div class="basis-full">
        <div class="max-w-7xl mx-auto my-10">
            <ul class="flex gap-x-3 justify-center mb-10">
                <li v-for="(e,i) in typeList" :key="e" class="px-2 py-1 border-2 rounded-md cursor-pointer" @click="typeOn = i" :class="typeOn ===i? 'bg-indigo-500 border-indigo-500 text-white':'border-slate-300'">{{ e }}</li>
            </ul>
            <ul v-for="(e,index) in cateItem" :key="index" class="flex flex-wrap justify-between border text-xs sm:text-sm">
                <li class="basis-full flex py-2">
                    <button @click="qOpen(index)" class="basis-11/12 px-4 text-left">
                        <span class="text-indigo-800">[{{ e.type }}]</span>
                        {{ e.content }}
                    </button>
                    <button class="basis-8" @click="aOpen(index)">reply</button>
                    <button @click="qOpen(index)" class="basis-8 text-right w-8 h-3"><font-awesome-icon icon="chevron-down" class="transition-all duration-500 text-xs align-baseline" :class="questionSelect === index && 'rotate-180'" /></button>
                </li>
                <li v-if="questionOpen === true && index === questionSelect" class="basis-full bg-gray-100 p-4">
                    {{ e.answer }}
                </li>
                <li v-if="answerOpen === true && index === questionSelect" class="basis-full px-2 py-2 bg-gray-100 flex gap-x-2">
                    <textarea v-model="answer" rows="1" class="flex-auto border px-2"></textarea> <button class="bg-indigo-500 text-white rounded p-1" @click="answerQ">답변등록</button>
                </li>
            </ul>
        </div>
        <div class="flex justify-end pb-24">
            <router-link v-if="$store.state.loginToken != null" to="/service/qna/write" class="bg-indigo-400 hover:bg-indigo-600 focus:ring-indigo-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">글쓰기</router-link>
        </div>
    </div>
</template>
<script>
import {db} from '../../firebase';
export default {
    name:"QnaList",
    data() {
        return {
            typeList:["전체","홈페이지 제작","홈페이지 운영","유지보수","기타"],
            dataList:[],
            dataId:[],
            answer:"",
            typeOn:0,
            questionSelect:null,
            questionOpen:false,
            answerOpen:false
        }
    },
    methods: {
        BoardDate(index){
            const date = this.dataList[index].date.seconds*1000 + this.dataList[index].date.nanoseconds/1000000;
            const new_date = new Date(date);
            const formattedDate = (''+new_date.getFullYear()).slice(-2)+'-'+ ('0'+( new_date.getMonth()+1)).slice(-2)+'-'+('0'+ new_date.getDate()).slice(-2)+'';
            return formattedDate
        },
        fetchPost(){
            let query = db.collection("qna").orderBy("date","desc")
            query.get().then((data)=>{
                const items = [];
                const ids = [];
                data.forEach((e)=>{
                    ids.push(e.id);
                    items.push(e.data());
                })
                this.dataId = ids;
                this.dataList = items;
            })
        },
        qOpen(index){
                this.questionSelect = index;
                this.questionOpen = !this.questionOpen
        },
        aOpen(index){
            this.answerOpen =true;
            this.questionSelect = index;
            this.$store.commit('QuaRead', this.dataId[index])
        },
        answerQ(){
            if ( this.$store.state.qnaId === 0){
            return
            }
            db.collection("qna").doc(this.$store.state.qnaId).get().then((data)=>{
                    this.dataList = data.data();
            })
            db.collection("qna").doc(this.$store.state.qnaId).update({"answer":this.answer}).then(()=>{
                this.fetchPost();
            })
        }
    },
    computed:{
        cateItem(){
            return this.dataList.filter((data)=>{
                if (this.typeOn !== 0){
                return data.type === this.typeList[this.typeOn]
                }else{
                return data.type
                }
            })
        }
    },
    created() {
        this.fetchPost();
    }
}
</script>
<style>
    
</style>