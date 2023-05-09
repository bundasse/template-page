<template lang="">
    <div class="mt-24 mb-5 flex flex-wrap justify-between basis-full gap-x-3 gap-y-4">
        <div v-for="e in management" :key="e" class="basis-full sm:basis-[49%] lg:basis-[24%] h-48 border box-border py-16 pl-8 pr-5 cursor-pointer text-center relative hover:bg-slate-200 transition-all">
            <p class="font-bold text-xl pb-5">{{e.title}}</p>
            <p class="text-gray-600 tracking-tighter"> {{e.desc}}</p>
            <font-awesome-icon :icon="e.icon" class="absolute text-gray-600 text-4xl top-8 right-8"/>
        </div>
    </div>
</template>
<script>
import data from '../../assets/Data.json'
export default {
    name:"HomeManagement",
    data() {
        return {
            management : data.Management
        }
    },
}
</script>
<style lang="">
    
</style>