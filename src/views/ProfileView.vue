<template>
    <div class="w-full">
        <div class="py-24 pt-48 text-center basis-full">
            <h3 class="text-3xl font-bold relative mb-5 after:absolute after:h-0.5 after:w-16 after:bg-slate-800 after:-bottom-2 after:left-2/4 after:-translate-x-2/4">정보수정</h3>
        </div>
        <div class="w-full lg:w-1/4 mx-auto flex flex-wrap justify-between mb-20 px-[2%] lg:px-0">
            <label class="basis-1/4 font-bold" for="email">이메일</label>
            <input class="border p-2 rounded basis-3/4 mb-2" type="text" v-model="email" disabled id="email">
            <label class="basis-1/4 font-bold" for="password">비밀번호</label>
            <input class="border p-2 rounded basis-3/4 mb-2" type="password" v-model="password" id="password">
            <label class="basis-1/4 font-bold" for="nickname">닉네임</label>
            <input class="border p-2 rounded basis-3/4 mb-10" type="text" v-model="nickName" id="nickname">
            <button @click="modify" class="rounded basis-full mb-1 hover:bg-blue-600 bg-blue-800 text-white font-bold p-2">정보 수정</button>
        </div>
    </div>
    {{ $store.state.displayName }}
</template>
<script>
import {auth} from '../firebase'
export default {
    name:"ProfileView",
    data() {
        return {
            nickName: "",
            email:"",
            password:"",
            uid:""
        }
    },
    mounted() {
        const user = auth.currentUser;
        console.log(user)
        console.log(user)
        if (user !== null) {
        this.nickName = user.displayName;
        this.email = user.email;
        this.password = user.password;
        this.uid = user.uid;
        }
    },
    methods: {
        modify(){
            const user = auth.currentUser;
            user.updatePassword(this.password);
            user.updateProfile({displayName: this.nickName}).then((a) => {
                console.log(a);
                sessionStorage.setItem("displayName",this.nickName);
                this.$store.commit('loginState',{displayName : this.nickName, uid: user.uid})
                this.$router.replace('/');
            }).catch((error) => {
                console.log('Error updating user:', error);
            });
        }
    },
}
</script>
<style>
    
</style>