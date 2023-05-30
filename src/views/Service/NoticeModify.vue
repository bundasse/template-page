<template>
    <div class="basis-full pb-24">
        <div class="max-w-7xl mx-auto my-10">
            <div class="flex flex-wrap">
                <label for="title" class="basis-1/4 lg:basis-1/12 text-center font-bold">제목</label><input v-model="title" type="text" id="title" class="border px-1 basis-3/4 lg:basis-8/12">
                <label for="author" class="basis-1/4 lg:basis-1/12 text-center font-bold">작성자</label><input v-model="author" type="text" id="author" class="border px-1 basis-3/4 lg:basis-2/12">
            </div>
            <textarea v-model="content" class="border w-full my-10 h-24"></textarea>
            <div class="flex justify-between border rounded w-full py-2 px-3">
                <input type="file" id="image" ref="fileInput" @change="NameChange" class="hidden">
                <div class="flex gap-x-5 text-sm items-center">
                    <button class="border bg-gray-700 p-1 px-2 text-white" id="openFile" @click="clickTrigger">파일선택</button>
                    <p>{{ fileInfo }}</p>
                </div>
                <span><input type="checkbox" v-model="fileDel">{{ FileNameSplit }}</span>
            </div>
            <div class="flex justify-end">
                <button @click="modify" class="bg-indigo-400 hover:bg-indigo-600 focus:ring-indigo-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">수정하기</button>
            </div>
        </div>
    </div>
</template>
<script>
import {db, storage} from '../../firebase'
export default {
    name:"NoticeModify",
    data() {
        return {
            BoardContent : [],
            name: this.$store.state.displayName,
            title:"",
            content:"",
            date: new Date(),
            fileInfo:"선택된 파일이 없습니다.",
            fileDel:false,
            file:""
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
                this.file = this.BoardContent.file;
        })
    },
    methods: {
        NameChange(e){
            if(e.target.files[0]){
                this.fileInfo = e.target.files[0].name;
            }else{
                this.fileInfo = "선택된 파일이 없습니다."
            }
        },
        clickTrigger(){
            this.$refs.fileInput.click()
        },
        modify(){
            if(this.fileDel){
                storage.ref().child(`images/${this.FileNameSplit}`).delete()
                this.file=""
            }
            db.collection("notice").doc(this.$store.state.noticeId).update({"author":this.author,"title": this.title, "content":this.content,"date":this.date, "file":this.file}).then(()=>{
                alert("수정이 완료되었습니다.");
                this.$router.replace("/service/notice");
            })
        }
    },
    computed:{
        FileNameSplit(){
            const parts = this.file.split("%2F")
            let fileName = "";
            if(this.file !== ""){
                fileName = parts[parts.length-1].split("?")[0]
            }
            return fileName
            /*
            split : 문자열을 특정 구분자로 분리하여 배열로 반환. 본래의 문자열을 변경하지 않고 새 배열로 반환한다.
            split(seperator) : seperator는 문자열을 분리할 위치를 지정하는 문자열 또는 정규식. seperator가 없으면 전체 문자열이 하나의 요소로 이루어진 '배열'로 반환된다.
            split(seperator, limit) : limit은 반환할 최대 요소 수를 지정하여 limit개의 요소를 가진 배열로 반환하고, 원래 문자열의 나머지 부분은 무시한다.
            let string = "1,2,3,4,5"
            let arr = str.split(",", 3);
            하면 arr = ["1","2","3"]까지만 출력됨.
            
            위에 사용된 것은
            1.split("%2F")를 사용, %2F를 기준으로 분할하여 배열로 저장한다.
            2.그중 뒤의부분을 split("?")를 사용해서 새 배열을 저장하고 앞부분만 떼낸다.
            즉 ~~~~~~%2F 요 사이에 들어가는 글을 똑 잘라냄 ?~~~~~~
            */
        }
    }
}
</script>
<style>
    
</style>