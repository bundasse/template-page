<template lang="">
    <div class="w-full">
        <div class="max-w-7xl mx-auto flex flex-wrap px-[2%]">
            <router-view :title="ArrayTitle" :desc="ArrayDesc"></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name:"ProductView",
    data() {
        return {
            ArrayTitle: ["제품소개1", "제품소개2", "제품소개3"],
            ArrayDesc: ["제품소개1 서브메세지", "제품소개2 서브메세지", "제품소개3 서브메세지"]
        }
    },
}
</script>
<style lang="">
    
</style>