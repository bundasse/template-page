<template>
    <div class="basis-full pb-24">
        <div class="max-w-7xl mx-auto my-10">
            <div class="flex flex-wrap">
                <label for="title" class="basis-1/4 lg:basis-1/12 mb-2 lg:mb-0 text-center font-bold">제목</label><input v-model="title" type="text" id="title" class="border px-1 basis-3/4 lg:basis-8/12 mb-2 lg:mb-0">
                <label for="author" class="basis-1/4 lg:basis-1/12 text-center font-bold">작성자</label><input v-model="author" type="text" id="author" class="border px-1 basis-3/4 lg:basis-2/12">
            </div>
            <textarea v-model="content" class="border w-full mt-10 h-24"></textarea>
            <input type="file" id="image" class="shadow appearance-none border rounded w-full mt-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <div class="flex justify-end mt-10">
                <button @click="write" class="bg-indigo-400 hover:bg-indigo-600 focus:ring-indigo-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">등록하기</button>
            </div>
        </div>
    </div>
</template>
<script>
import {db,storage} from '../../firebase'
export default {
    name:"NoticeWrite",
    data() {
        return {
            title:"",
            author:this.$store.state.displayName,
            content:"",
            file:"",
            date: new Date(),
            fileRandom : null
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
            this.file = document.querySelector("#image").files[0];
            if(this.file){
                storage.ref().child("files/"+this.fileRandom).put(this.file).then(()=>{
                    storage.ref().child("files/"+this.fileRandom).getDownloadURL().then((url)=>{
                        //파일 경로 가져오기
                        db.collection("notice").add({
                        "author":this.author,
                        "title": this.title,
                        "content":this.content,
                        "date":this.date,
                        "hit" : 1,
                        "good": 0,
                        "bad":0,
                        "uid" : this.$store.state.uid,
                        "file": url
                    })
                    this.$router.replace("/service/notice")
                    })
                })
            }else{
                db.collection("notice").add({
                    "author":this.author,
                    "title": this.title,
                    "content":this.content,
                    "date":this.date,
                    "hit" : 1,
                    "good": 0,
                    "bad":0,
                    "uid" : this.$store.state.uid
                })
                this.$router.replace("/service/notice")
            }
        }
    },
}
</script>
<style>
    
</style>