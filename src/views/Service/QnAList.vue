<template>
    <div class="basis-full">
        <div class="max-w-7xl mx-auto my-10 pb-24">
            <ul class="flex gap-x-3 justify-center mb-10">
                <li v-for="(e,i) in typeList" :key="e" class="px-2 py-1 border-2 rounded-md cursor-pointer" @click="typeOn = i" :class="typeOn ===i? 'bg-indigo-500 border-indigo-500 text-white':'border-slate-300'">{{ e }}</li>
            </ul>

            <div class="flex justify-between items-center text-sm py-3 border-y-2 border-l-indigo-300 mb-10">
                <select v-model="type" name="type" id="type" class="basis-1/12 border px-1 py-2">
                    <option value="" selected>문의내용 선택</option>
                    <option value="홈페이지 제작">홈페이지 제작</option>
                    <option value="홈페이지 운영">홈페이지 운영</option>
                    <option value="유지보수">유지보수</option>
                    <option value="기타">기타</option>
                </select>
                <label for="content" class="basis-1/12 mb-0 text-center font-bold">질문 내용</label>
                <textarea v-model="content" class="border px-1 basis-8/12"></textarea>
                <button @click="write" class="bg-indigo-400 hover:bg-indigo-600 focus:ring-indigo-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">등록하기</button>
            </div>
            <ul v-for="(e,index) in cateItem" :key="index" class="flex flex-wrap justify-between border text-xs sm:text-sm">
                <li class="basis-full flex py-2">
                    <button @click="qOpen(index)" class="basis-11/12 px-4 text-left">
                        <span class="text-indigo-800">[{{ e.type }}]</span>
                        {{ e.content }}
                    </button>
                    <router-link v-if="e.answer === ''" class="basis-8" :to="{ name:'qnawrite', query:{docId: dataId[index]} }" @click="$store.commit('QnaWrite', dataId[index])">reply</router-link>
                    <button v-else @click="qOpen(index)" class="basis-8 text-right w-8 h-3"><font-awesome-icon icon="chevron-down" class="transition-all duration-500 text-xs align-baseline" :class="questionSelect === index && 'rotate-180'" /></button>
                </li>
                <li v-if="questionOpen === true && index === questionSelect" class="basis-full bg-gray-100 p-4">
                    {{ e.answer }}
                </li>
            </ul>
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
            author:this.$store.state.displayName,
            content:"",
            type: "",
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
            this.questionOpen = !this.questionOpen
            if(this.questionSelect === null){
                this.questionSelect = index;
            }else{
                this.questionSelect = null
            }
        },
        aOpen(index){
            this.answerOpen =true;
            this.questionSelect = index;
        },
        write(){
            db.collection("qna").add({
                "author":this.author,
                "content":this.content,
                "date":new Date(),
                "uid" : this.$store.state.uid,
                "type": this.type,
                "answer": ''
            })
            this.content="", this.type = "";
            this.fetchPost()
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