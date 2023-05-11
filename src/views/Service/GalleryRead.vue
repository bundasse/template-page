<template>
    <div class="basis-full text-sm">
        <img :src="BoardContent.file" alt="첨부파일" class="w-full max-h-[400px] object-cover">
        <div class="w-full flex flex-wrap justify-between py-3">
            <div class="basis-full px-2 py-1 font-semibold text-xl">
                {{BoardContent.title}}
            </div>
            <div class="basis-full flex text-center">
                <p class="px-2 py-1 relative after:inline-block after:absolute after:w-0.5 after:h-3 after:bg-slate-200 after:-right-0.5 after:top-2.5"><span class="font-bold mr-2">작성자</span>{{BoardContent.author}}</p>
                <p class="px-2 py-1 relative after:inline-block after:absolute after:w-0.5 after:h-3 after:bg-slate-200 after:-right-0.5 after:top-2.5"><span class="font-bold mr-2">작성일자</span>{{dateTime}}</p>
                <p class="px-2 py-1 relative after:inline-block after:absolute after:w-0.5 after:h-3 after:bg-slate-200 after:-right-0.5 after:top-2.5"><span class="font-bold mr-2">조회수</span>{{ BoardContent.hit}}</p>
                <p class="px-2 py-1 relative after:inline-block after:absolute after:w-0.5 after:h-3 after:bg-slate-200 after:-right-0.5 after:top-2.5"><span class="font-bold mr-2">추천</span>{{BoardContent.good}}</p>
                <p class="px-2 py-1"><span class="font-bold mr-3">비추천</span>{{BoardContent.bad}}</p>
            </div>
        </div>
        <div class="w-full border-y px-2 py-10">
            {{ BoardContent.content }}
            <div class="w-48 mx-auto flex justify-between mt-10">
                <button @click="goodChk()" class="w-20 py-2 rounded-md border-2 border-cyan-200 bg-white font-bold text-cyan-700 hover:border-cyan-400 hover:text-white hover:bg-cyan-400"> <span class="text-xl"><font-awesome-icon icon="thumbs-up" /></span><br/>추천</button>
                <button @click="badChk()" class="w-20 py-2 rounded-md border-2 border-cyan-200 bg-white font-bold text-cyan-700 hover:border-cyan-400 hover:text-white hover:bg-cyan-400"> <span class="text-xl"><font-awesome-icon icon="thumbs-down" /></span><br/>비추천</button>
            </div>
        </div>
        <div class="flex justify-between pb-24 mt-5">
            <div>
                <router-link to="/service/gallery/list" class="bg-indigo-400 hover:bg-indigo-600 focus:ring-indigo-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">목록으로</router-link>
            </div>
            <div class="flex gap-x-5">
                <button @click="Delete()" class="bg-red-400 hover:bg-red-600 focus:ring-red-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">삭제</button>
            </div>
        </div>
    </div>
</template>
<script>
import {db} from '../../firebase';
export default {
    name:"GalleryRead",
    data() {
        return {
            BoardContent : [],
            dateTime: ""
        }
    },
    mounted() {
        if ( this.$route.query.docId === null){
            this.$router.replace("/service/gallery")
        }
        db.collection("gallery").doc(this.$route.query.docId).get().then((data)=>{
            this.BoardContent = data.data()
            if(data.data().isUpdate){
                return;
            }
            db.collection("gallery").doc(this.$route.query.docId).update({
                hit: data.data().hit+1,
                isUpdate: true
            })
        }).then(()=>{
            db.collection("gallery").doc(this.$route.query.docId).get().then((update)=>{
                this.BoardContent = update.data();
                const date = this.BoardContent.date.seconds*1000 + this.BoardContent.date.nanoseconds/1000000;
                const new_date = new Date(date);
                //밀리세컨드초를 date객체로 변환한다
                const formattedDate = (''+new_date.getFullYear()).slice(-2)+'-'+ ('0'+( new_date.getMonth()+1)).slice(-2)+'-'+('0'+ new_date.getDate()).slice(-2)+' '+('0'+ new_date.getHours()).slice(-2)+':'+('0'+ new_date.getMinutes()).slice(-2)+':'+('0'+ new_date.getSeconds()).slice(-2)+'';
                return this.dateTime = formattedDate;
            })
        })
    },
    methods: {
        Delete(){
            let msg = confirm("삭제된 데이터는 복구할 수 없습니다 \r\r 삭제하시겠습니까?")
            if (msg){
                db.collection("gallery").doc(this.$route.query.docId).delete().then(() => {
                    alert("게시물이 삭제되었습니다.");
                    this.$router.replace("/service/gallery")
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            }
        },
        goodChk(){
            if(this.BoardContent.goodChk === true){
                alert("이미 평가한 글입니다.");
                return
            }
            db.collection("gallery").doc(this.$route.query.docId).update({
                good: this.BoardContent.good + 1,
                goodChk : true
            }).then(()=>{
                db.collection("gallery").doc(this.$route.query.docId).get().then((data)=>{this.BoardContent = data.data()})
            })
        },
        badChk(){
            if(this.BoardContent.goodChk === true){
                alert("이미 평가한 글입니다.");
                return
            }
            db.collection("gallery").doc(this.$route.query.docId).update({
                bad: this.BoardContent.bad + 1,
                goodChk : true
            }).then(()=>{
                db.collection("gallery").doc(this.$route.query.docId).get().then((data)=>{this.BoardContent = data.data()})
            })
        }
    }
}
</script>
<style>
    
</style>