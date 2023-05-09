<template lang="">
    <div class="py-24 pt-48 text-center basis-full">
        <h3 class="text-3xl font-bold relative mb-5 after:absolute after:h-0.5 after:w-16 after:bg-slate-800 after:-bottom-2 after:left-2/4 after:-translate-x-2/4">{{title[3]}}</h3>
        <p class="text-gray-400">{{desc[3]}}</p>
    </div>
</template>
<script>
export default {
    name: "GalleryView",
    props:{title: Array , desc:Array},
}
</script>
<style lang="">
    
</style>