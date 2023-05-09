<template lang="">
    <div class="w-full">
        <div class="max-w-7xl mx-auto flex flex-wrap px-[2%]">
            <router-view :title="ArrayTitle" :desc="ArrayDesc"></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name:"ServiceView",
    data() {
        return {
            ArrayTitle: ["공지사항", "온라인 문의", "질문과 답변", "갤러리"],
            ArrayDesc: ["공지사항 서브메세지", "온라인 문의 서브메세지", "질문과 답변 서브메세지", "갤러리 서브메세지"]
        }
    },
}
</script>
<style lang="">
    
</style>