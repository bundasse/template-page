<template>
    <div class="basis-full">
        <div class="max-w-7xl mx-auto my-10">
            <div class="flex flex-wrap gap-x-2 gap-y-2">
                <template v-for="(e,index) in dataList" :key="index">
                    <ul v-if="calculateNumber(totalLength, perPage, page, index) >0" class="basis-full sm:basis-[49%] lg:basis-[32.5%] flex flex-wrap gap-x-3 border rounded border-gray-300 p-2 text-xs sm:text-sm">
                        <li class="basis-full hidden">{{ calculateNumber(totalLength, perPage, page, index) }}</li>
                        <router-link :to="{ name:'galleryread', query:{docId: dataId[index]} }" @click="$store.commit('GalleryRead', dataId[index])" class="basis-full flex flex-wrap">
                        <li class="basis-full"><img :src="e.file" :alt="e.title" class="w-full h-[200px] object-cover"></li>
                        <li class="basis-full mt-3 mb-1 text-lg font-bold">
                            {{ e.title }} <span class="text-xs text-zinc-400"><font-awesome-icon icon="thumbs-up" /> {{ e.good }}  <font-awesome-icon icon="thumbs-down" /> {{ e.bad }}</span>
                        </li></router-link>
                        <li class="relative after:absolute after:w-0.5 after:h-3 after:bg-gray-200 after:top-[6px] after:-right-2">작성자 {{e.author}}</li>
                        <li class="relative after:absolute after:w-0.5 after:h-3 after:bg-gray-200 after:top-[6px] after:-right-2">조회수 {{ e.hit }}</li>
                        <li class="basis-1/2">날짜 {{BoardDate(index)}}</li>
                    </ul>
                </template>
            </div>
        </div>
        <div class="flex justify-end">
            <router-link v-if="$store.state.loginToken != null" to="/service/gallery/write" class="bg-indigo-400 hover:bg-indigo-600 focus:ring-indigo-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">글쓰기</router-link>
        </div>
        <div class="flex justify-center basis-full gap-x-2 pb-24 items-center">
            <button @click="prevPage" :disabled="currentPage <= 1" class="font-bold">이전</button>
            <button v-for="e in pageCount.pagenation" :key="e" @click="goToPage(e)" :class="e === page ? 'font-bold text-indigo-600': 'text-slate-600'">{{ e }}</button>
            <button @click="nextPage" :disabled="currentPage >= pageCount.totalPage / block" class="font-bold">다음</button>
        </div>
    </div>
</template>
<script>
import {db} from '../../firebase';
export default {
    name:"NoticeList",
    data() {
        return {
            dataList:[],
            dataId:[],
            posts:[],
            page:1,
            perPage: 5,
            lastVisible: null,
            totalLength:0,
            block:5, //페이지를 몇개씩 보여줄건지(여기선 5개씩 보여줄거임, 1~5페이지 6~10페이지 이렇게 넘어가게.)
            currentPage:1
        }
    },
    methods: {
        BoardDate(index){
            const date = this.dataList[index].date.seconds*1000 + this.dataList[index].date.nanoseconds/1000000;
            const new_date = new Date(date);
            //밀리세컨드초를 date객체로 변환한다
            const formattedDate = (''+new_date.getFullYear()).slice(-2)+'-'+ ('0'+( new_date.getMonth()+1)).slice(-2)+'-'+('0'+ new_date.getDate()).slice(-2)+'';
            return formattedDate
        },
        fetchTotalLength(){
            db.collection("gallery").get().then((data)=>{
                this.totalLength = data.size
            })
        },
        fetchPost(){
            let query = db.collection("gallery").orderBy("date","desc").limit(this.perPage)
            if(this.page>1 && this.lastVisible){
                query = query.startAfter(this.lastVisible);
            }
            query.get().then((data)=>{
                const items = [];
                const ids = [];
                data.forEach((e)=>{
                    ids.push(e.id);
                    items.push(e.data());
                })
                this.dataId = ids;
                this.dataList = items;
                this.lastVisible = data.docs[data.docs.length - 1];
            })
        },
        calculateNumber(totalLength, perPage, page, index){
            const totalPages = perPage*(page-1);
            const postIndex = totalLength - (totalPages+index);
            if (postIndex <= 0){return}
            return postIndex
        },
        prevPage(){
            this.currentPage = this.currentPage -1;
            this.page = this.pageCount.pagenation[0];
            this.fetchPost()
        },
        nextPage(){
            this.currentPage = this.currentPage +1;
            this.page = this.pageCount.pagenation[0];
            this.fetchPost()
        },
        goToPage(e){
            this.page= e;
            this.fetchPost()
        }
    },
    computed:{
        pageCount(){
            const totalPage = Math.ceil(this.totalLength/this.perPage);
            const start = (this.currentPage -1)*this.block;
            const end = start + this.block;
            const pagenation = [];
            for(let i = start +1 ; i <=end && i <=totalPage; i++){
                pagenation.push(i);
            }
            if(pagenation.length === 0 && totalPage >0){
                pagenation.push(totalPage);
            }
            return {totalPage, start, end, pagenation}
        }
    },
    created() {
        this.fetchTotalLength();
        this.fetchPost();
    },
}
</script>
<style>
    
</style>