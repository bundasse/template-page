<template>
    <div class="basis-full pb-24">
        <div class="max-w-7xl mx-auto my-10">
            <div class="flex flex-wrap gap-y-3 items-start">
                <div class="basis-full flex px-4 py-2">
                    <span class="text-indigo-800">[{{ BoardContent.type }}]</span>
                    {{ BoardContent.content }}
                </div>
                <div class="basis-full p-4 bg-gray-100 flex gap-x-2 text-sm">
                    <textarea v-model="answer" rows="2" class="flex-auto border p-2"></textarea> <button class="bg-indigo-500 text-white rounded px-2 py-1" @click="reply">답변등록</button>
                </div>
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
            BoardContent:[],
            answer:""
        }
    },
    methods: {
        reply(){
            db.collection("qna").doc(this.$store.state.qnaId).update({"answer":this.answer}).then(()=>{
                alert("답변 등록이 완료되었습니다.");
                this.$router.replace("/service/qna");
            }).catch((error)=>{console.log(error)})
        }
    },
    mounted() {
        if ( this.$store.state.qnaId === 0){
            this.$router.replace("/service/qna")
        }
        db.collection("qna").doc(this.$store.state.qnaId).get().then((data)=>{
                this.BoardContent = data.data(),
                this.name = this.BoardContent.name;
                this.title = this.BoardContent.title;
                this.content = this.BoardContent.content;
        })
    },
}
</script>
<style>
    
</style>