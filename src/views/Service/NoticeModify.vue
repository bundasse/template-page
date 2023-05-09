<template>
    <div class="basis-full pb-24">
        <div class="max-w-7xl mx-auto my-10">
            <div class="flex flex-wrap">
                <label for="title" class="basis-1/4 lg:basis-1/12 text-center font-bold">제목</label><input v-model="title" type="text" id="title" class="border px-1 basis-3/4 lg:basis-8/12">
                <label for="author" class="basis-1/4 lg:basis-1/12 text-center font-bold">작성자</label><input v-model="author" type="text" id="author" class="border px-1 basis-3/4 lg:basis-2/12">
            </div>
            <textarea v-model="content" class="border w-full my-10 h-24"></textarea>
            <div class="flex justify-end">
                <button @click="modify" class="bg-indigo-400 hover:bg-indigo-600 focus:ring-indigo-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">수정하기</button>
            </div>
        </div>
    </div>
</template>
<script>
import {db} from '../../firebase'
export default {
    name:"NoticeModify",
    data() {
        return {
            BoardContent : [],
            name: this.$store.state.displayName,
            title:"",
            content:"",
            date: new Date()
        }
    },
    mounted() {
        if ( this.$store.state.noticeId === 0){
            this.$router.replace("/service/notice")
        }
        db.collection("notice").doc(this.$store.state.noticeId).get().then((data)=>{
                this.BoardContent = data.data(),
                this.name = this.BoardContent.name;
                this.title = this.BoardContent.title;
                this.content = this.BoardContent.content;
        })
    },
    methods: {
        modify(){
            db.collection("notice").doc(this.$store.state.noticeId).update({"author":this.author,"title": this.title, "content":this.content,"date":this.date}).then(()=>{
                alert("수정이 완료되었습니다.");
                this.$router.replace("/service/notice");
            })
        }
    },
}
</script>
<style>
    
</style>