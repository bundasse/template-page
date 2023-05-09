<template lang="">
    <div class="w-full">
        <div class="py-24 pt-48 text-center basis-full">
            <h3 class="text-3xl font-bold relative mb-5 after:absolute after:h-0.5 after:w-16 after:bg-slate-800 after:-bottom-2 after:left-2/4 after:-translate-x-2/4">회원가입</h3>
        </div>
        <div class="w-full lg:w-1/4 mx-auto flex flex-wrap justify-between mb-20 px-[2%] sm:px-0">
            <label class="basis-1/4 font-bold" for="email">이메일</label>
            <input class="border p-2 rounded basis-3/4 mb-2" type="text" v-model="email" id="email">
            <label class="basis-1/4 font-bold" for="password">비밀번호</label>
            <input class="border p-2 rounded basis-3/4 mb-2" type="password" v-model="password" id="password">
            <label class="basis-1/4 font-bold" for="nickname">닉네임</label>
            <input class="border p-2 rounded basis-3/4 mb-10" type="text" v-model="nickname" placeholder="닉네임" id="nickname">
            <button @click="signUp" class="rounded basis-full mb-1 hover:bg-blue-600 bg-blue-800 text-white font-bold p-2">가입하기</button>
        </div>
    </div>
</template>
<script>
import {auth} from '../firebase'
export default {
    name: "MemberView",
    data() {
        return {
            email:'',
            password:"",
            nickname:"",
        }
    },
    methods: {
        signUp(){
            auth.createUserWithEmailAndPassword(this.email,this.password).then((result)=>{
                result.user.updateProfile({displayName: this.nickname})
                console.log(result);
                console.log(result.user);
            })
        }
    },
}
</script>
<style>
    
</style>