<template lang="">
    <div class="w-full">
        <div class="max-w-7xl mx-auto flex flex-wrap px-[2%]">
            <router-view :title="ArrayTitle" :desc="ArrayDesc"></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name:"BusinessView",
    data() {
        return {
            ArrayTitle: ["사업소개1", "사업소개2", "사업소개3"],
            ArrayDesc: ["사업소개1 서브메세지", "사업소개2 서브메세지", "사업소개3 서브메세지"]
        }
    },
}
</script>
<style lang="">
    
</style>