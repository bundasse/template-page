<template lang="">
    <div class="w-full">
        <div class="py-24 pt-48 text-center basis-full">
            <h3 class="text-3xl font-bold relative mb-5 after:absolute after:h-0.5 after:w-16 after:bg-slate-800 after:-bottom-2 after:left-2/4 after:-translate-x-2/4">로그인</h3>
        </div>
        <div class="w-full sm:w-1/2 lg:w-1/4 mx-auto mb-5 rounded bg-[#FEE500] cursor-pointer" @click="kakaoLogin"><img :src="require('@/assets/kakao_login.png')" class="mx-auto" alt="카카오 로그인" title="카카오톡으로 로그인"></div>
        <a href="https://kauth.kakao.com/oauth/authorize?client_id=f413cf9c5dfda34cfb26681d32ac586d&redirect_uri=http://localhost:8080/templatehome/auth&response_type=code" class="block w-full sm:w-1/2 lg:w-1/4 mx-auto mb-5 rounded bg-[#FEE500] cursor-pointer text-center py-2 font-bold">카카오로그인2</a>
        <div class="w-full sm:w-1/2 lg:w-1/4 mx-auto border-b-2 mb-5"></div>
        <div class="w-full sm:w-1/2 lg:w-1/4 mx-auto flex flex-wrap justify-center mb-20 px-[2%] sm:px-0">
            <input class="border p-2 rounded basis-full mb-3" v-model="email" type="text" name="email" id="email" placeholder="이메일">
            <input class="border p-2 rounded basis-full mb-10" v-model="password" type="password" name="password" id="password" placeholder="비밀번호" @keyup.enter="login">
            <button @click="login()" class="rounded basis-full mb-1 hover:bg-blue-600 bg-blue-800 text-white font-bold p-2">로그인</button>
            <button class="underline text-gray-500 mx-auto text-sm">회원가입</button>
            <span class="text-sm text-rose-600">{{errorMsg}}</span>
        </div>
    </div>
</template>
<script>
import {auth} from '../firebase'
export default {
    name: "LoginView",
    data() {
        return {
            email:'',
            password:"",
            errorMsg:""
        }
    },
    methods: {
        kakaoLogin(){
            window.Kakao.init('4087fbcbb6e717750dbff159db53fdea');
            window.Kakao.Auth.login({
                success: function() {
                    window.Kakao.API.request({
                        url: '/v2/user/me',
                        data: {
                            property_keys: [
                            "kakao_account.profile",
                            "kakao_account.email"
                            ]
                        },
                        success: function(res){
                            console.log(res)
                        },
                        fail: function(err) {
                            console.log(err)
                        }
                    })
                },
                fail:function(error) {
                    console.log(error)
                }
            })
        },
        login(){
           if (!this.email) {
                this.errorMsg = "이메일을 입력해주세요!";
                return false;
           }
           if (!this.password) {
                this.errorMsg = "비밀번호를 입력해주세요!";
                return false;
           }
           auth.signInWithEmailAndPassword(this.email,this.password).then(((user)=>{
                console.log(user.user);
                sessionStorage.setItem("refreshToken",user.user.refreshToken);
                sessionStorage.setItem("displayName",user.user.displayName);
                this.$store.commit("loginToken", {refreshToken:user.user.refreshToken, uid:user.user.uid, displayName: user.user.displayName});
                this.$router.replace('/'); //로그인되면 메인으로간다
            }),
            ((error)=>{
                this.errorMsg = error.message
                if (error.code == 'auth/invalid-email') {
                this.errorMsg= '이메일 형식이 잘못되었습니다.'
                }
                if (error.code == 'auth/user-not-found') {
                this.errorMsg= '존재하지 않는 이메일입니다.'
                }
                if (error.code == 'auth/wrong-password') {
                this.errorMsg='비밀번호를 다시 확인해주세요'
                }
                if (error.code == 'auth/too-many-requests') {
                this.errorMsg='잠시 후 다시 시도해 주세요'
                }
            }))
        }
    },
}
</script>
<style lang="">
    
</style>