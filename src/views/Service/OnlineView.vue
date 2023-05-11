<template lang="">
    <div class="py-24 pt-48 text-center basis-full">
        <h3 class="text-3xl font-bold relative mb-5 after:absolute after:h-0.5 after:w-16 after:bg-slate-800 after:-bottom-2 after:left-2/4 after:-translate-x-2/4">{{title[1]}}</h3>
        <p class="text-gray-400">{{desc[1]}}</p>
    </div>
    <div class="max-w-7xl mx-auto py-10 border-y-2 mb-24">
        <form>
            <fieldset>
                <div class="flex flex-wrap">
                    <legend class="font-bold text-2xl basis-full lg:basis-2/12">의뢰자 정보</legend>
                    <div class="flex flex-wrap justify-between gap-y-5 basis-full lg:basis-10/12">
                        <p class="basis-full lg:basis-2/12 text-sm">의뢰자명 <span class="text-rose-600 font-bold">*</span></p><input type="text" required class="basis-full lg:basis-4/12 border-[1px] px-2 py-1 rounded" v-model="reqName">
                        <p class="basis-full lg:basis-2/12 pl-0 lg:pl-5 text-sm">회사명 <span class="text-rose-600 font-bold">*</span></p><input type="text" required class="basis-full lg:basis-4/12 border-[1px] px-2 py-1 rounded" v-model="reqComp">
                        <p class="basis-full lg:basis-2/12 text-sm">전화번호 <span class="text-rose-600 font-bold">*</span></p><input type="text" required class="basis-full lg:basis-4/12 border-[1px] px-2 py-1 rounded" v-model="reqPhone">
                        <p class="basis-full lg:basis-2/12 pl-0 lg:pl-5 text-sm">메일 주소 <span class="text-rose-600 font-bold">*</span></p><input type="text" required class="basis-full lg:basis-4/12 border-[1px] px-2 py-1 rounded" v-model="reqMail">
                        <p class="basis-full lg:basis-2/12 text-sm">부서/직함</p><input type="text" class="basis-full lg:basis-4/12 border-[1px] px-2 py-1 rounded" v-model="reqPhone">
                        <p class="basis-full lg:basis-2/12 pl-0 lg:pl-5 text-sm">회사 홈페이지</p><input type="text" class="basis-full lg:basis-4/12 border-[1px] px-2 py-1 rounded" v-model="reqHome">
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div class="flex flex-wrap mt-10 border-t-[1px] pt-10">
                    <legend class="font-bold text-2xl basis-full lg:basis-2/12">프로젝트 정보</legend>
                    <div class="flex flex-wrap justify-between gap-y-5 basis-full lg:basis-10/12">
                        <p class="basis-full">프로젝트 제목 <span class="text-rose-600 font-bold">*</span></p><input type="text" required class="border-[1px] px-2 py-1 basis-full rounded" v-model="proTitle">
                        <p class="basis-full">프로젝트 타입</p>
                        <div class="basis-full flex flex-wrap gap-y-1">
                            <p class="basis-3/12">
                                <input type="checkbox" v-model="proType" value="홈페이지 제작"><span class="text-sm ml-3">홈페이지 제작</span>
                            </p>
                            <p class="basis-3/12">
                                <input type="checkbox" v-model="proType" value="유지보수"><span class="text-sm ml-3">유지보수</span>
                            </p>
                            <p class="basis-3/12">
                                <input type="checkbox" v-model="proType" value="연간운영"><span class="text-sm ml-3">연간운영</span>
                            </p>
                            <p class="basis-3/12">
                                <input type="checkbox" v-model="proType" value="반응형웹"><span class="text-sm ml-3">반응형웹</span>
                            </p>
                            <p class="basis-3/12">
                                <input type="checkbox" v-model="proType" value="모바일웹"><span class="text-sm ml-3">모바일웹</span>
                            </p>
                            <p class="basis-3/12">
                                <input type="checkbox" v-model="proType" value="쇼핑몰"><span class="text-sm ml-3">쇼핑몰</span>
                            </p>
                            <p class="basis-3/12">
                                <input type="checkbox" v-model="proType" value="웹접근성 인증"><span class="text-sm ml-3">웹접근성 인증</span>
                            </p>
                            <p class="basis-3/12">
                                <input type="checkbox" v-model="proType" value="솔루션"><span class="text-sm ml-3">솔루션</span>
                            </p>
                            <p class="basis-3/12">
                                <input type="checkbox" v-model="proType" value="그 외"><span class="text-sm ml-3">기타</span>
                            </p>
                        </div>
                        <p class="basis-full">파일 첨부</p><input type="file" class="border-[1px] px-2 py-1 basis-full rounded">
                        <p class="basis-full">상세 문의 내용 <span class="text-rose-600 font-bold">*</span></p><textarea class="border-[1px] px-2 py-1 basis-full rounded" required v-model="proDesc"></textarea>
                    </div>
                </div>
            </fieldset>
            <div class="w-full text-right mt-10">
                <input type="submit" value="제출하기" class="px-20 py-5 bg-indigo-800 text-lg text-white rounded cursor-pointer hover:bg-indigo-600">
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name: "OnlineView",
    data() {
        return {
            reqName:"",
            reqComp:"",
            reqPhone:"",
            reqMail:"",
            reqDept:"",
            reqHome:"",
            proTitle:"",
            proType:[],
            proDesc:""
        }
    },
    props:{title: Array , desc:Array},
}
</script>
<style lang="">
    
</style>