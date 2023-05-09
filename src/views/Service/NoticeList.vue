<template>
    <div class="basis-full">
        <div class="max-w-7xl mx-auto my-10">
            <ul class="flex justify-between border-t-indigo-500 border-t-2 bg-indigo-50 px-4 py-2 text-xs sm:text-sm text-center font-bold">
                <li class="basis-10">번호</li>
                <li class="basis-7/12">제목</li>
                <li class="basis-16">글쓴이</li>
                <li class="basis-12 ">조회수</li>
                <li class="basis-24">추천 / 비추천</li>
                <li class="basis-24">날짜</li>
            </ul>
            <template v-for="(e,index) in dataList" :key="index">
                <ul v-if="calculateNumber(totalLength, perPage, page, index) >0" class="flex justify-between border-b border-gray-300 even:bg-gray-50 px-4 py-2 text-xs sm:text-sm">
                    <li class="basis-10 text-center">{{ calculateNumber(totalLength, perPage, page, index) }}</li>
                    <li class="basis-7/12">
                        <router-link :to="{ name:'noticeread', query:{docId: dataId[index]} }" @click="$store.commit('NoticeRead', dataId[index])">{{ e.title }}</router-link>
                    </li>
                    <li class="basis-16 text-center">{{e.author}}</li>
                    <li class="basis-12 text-center">{{ e.hit }}</li>
                    <li class="basis-24 text-center">
                        <span class="text-xs text-zinc-400"><font-awesome-icon icon="thumbs-up" /> {{ e.good }}  <font-awesome-icon icon="thumbs-down" /> {{ e.bad }}</span>
                    </li>
                    <li class="basis-24 text-center">{{BoardDate(index)}}</li>
                </ul>
            </template>
        </div>
        <div class="flex justify-end">
            <router-link v-if="$store.state.loginToken != null" to="/service/notice/write" class="bg-indigo-400 hover:bg-indigo-600 focus:ring-indigo-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">글쓰기</router-link>
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
        BoardDate(index){;
            const date = this.dataList[index].date.seconds*1000 + this.dataList[index].date.nanoseconds/1000000;
            const new_date = new Date(date);
            //밀리세컨드초를 date객체로 변환한다
            const formattedDate = (''+new_date.getFullYear()).slice(-2)+'-'+ ('0'+( new_date.getMonth()+1)).slice(-2)+'-'+('0'+ new_date.getDate()).slice(-2)+'';
            return formattedDate
        },
        fetchTotalLength(){
            db.collection("notice").get().then((data)=>{
                this.totalLength = data.size
            })
        },
        fetchPost(){
            let query = db.collection("notice").orderBy("date","desc").limit(this.perPage)
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
                this.lastVisible = data.docs[data.docs.length - 1]; // -1을 주는 이유 : 배열의 첫번째는 0번째니까.
            })
        },
        calculateNumber(totalLength, perPage, page, index){
            const totalPages = perPage*(page-1);
            //현재 페이지 이전의 게시물 수
            const postIndex = totalLength - (totalPages+index);
            //이 게시물의 index 계산. 게시물 인덱스가 내림차순으로 표시될것
            if (postIndex <= 0){return}
            //0보다 작거나 같으면 함수종료. 마지막 페이지에서 음수값이나 0값이 나오지 않게끔!
            return postIndex
        },
        prevPage(){
            this.currentPage = this.currentPage -1;
            this.page = this.pageCount.pagenation[0];
            this.fetchPost()
        },
        nextPage(){
            this.currentPage = this.currentPage +1;
            //현재 블록 페이지번호를 1 증감
            this.page = this.pageCount.pagenation[0];
            //배열에 추가된 첫번째 번호로 페이지 이동
            this.fetchPost()
            //이동된 페이지의 게시글 호출
        },
        goToPage(e){
            this.page= e;
            this.fetchPost()
        }
    },
    computed:{
        pageCount(){
            const totalPage = Math.ceil(this.totalLength/this.perPage);
            //전체 페이지 수 계산 : 전체 게시물 / 페이지 당 개수 하고 소수점 올림처리.
            const start = (this.currentPage -1)*this.block;
            //현재 페이지에 보여질 게시물의 시작인덱스
            const end = start + this.block;
            // 현재 페이지에 보여질 게시물의 끝인덱스
            const pagenation = [];
            // 페이지 번호 배열로 만든다
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