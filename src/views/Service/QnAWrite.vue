<template>
    <div class="basis-full pb-24">
        <div class="max-w-7xl mx-auto my-10">
            <div class="flex flex-wrap gap-y-3 items-start">
                <select v-model="type" name="type" id="type" class="basis-full xl:basis-2/12 border px-1 py-3">
                    <option value="" selected>문의내용 선택</option>
                    <option value="홈페이지 제작">홈페이지 제작</option>
                    <option value="홈페이지 운영">홈페이지 운영</option>
                    <option value="유지보수">유지보수</option>
                    <option value="기타">기타</option>
                </select>
                <label for="content" class="basis-1/4 lg:basis-1/12 mb-2 lg:mb-0 text-center font-bold">질문</label>
                <textarea v-model="content" class="border px-1 basis-3/4 lg:basis-9/12"></textarea>
            </div>
            <div class="flex justify-end mt-10">
                <button @click="write" class="bg-indigo-400 hover:bg-indigo-600 focus:ring-indigo-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">등록하기</button>
            </div>
        </div>
    </div>
</template>
<script>
import {db} from '../../firebase'
export default {
    name:"QnaWrite",
    data() {
        return {
            author:this.$store.state.displayName,
            content:"",
            date: new Date(),
            type: ""
        }
    },
    mounted() {
        const formattedDate = this.GetDate();
        this.fileRandom = formattedDate
    },
    methods: {
        GetDate(){
            const new_date = new Date();
            const RandomNum = Math.floor(Math.random()*999)+100;
            const formattedDate = (''+new_date.getFullYear())+ ('0'+( new_date.getMonth()+1)).slice(-2)+('0'+ new_date.getDate()).slice(-2)+'_'+('0'+ new_date.getHours()).slice(-2)+('0'+ new_date.getMinutes()).slice(-2)+('0'+ new_date.getSeconds()).slice(-2)+''+RandomNum;
            return formattedDate
        },
        write(){
            db.collection("qna").add({
                "author":this.author,
                "content":this.content,
                "date":this.date,
                "uid" : this.$store.state.uid,
                "type": this.type,
                "answer": ''
            })
            this.$router.replace("/service/qna")
        }
    },
}
</script>
<style>
    
</style>