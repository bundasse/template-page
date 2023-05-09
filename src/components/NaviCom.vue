<template>
    <div class="sticky top-0 w-full border-b bg-white border-b-white/30 z-40">
        <div class="max-w-7xl mx-auto flex justify-between px-[2%]">
            <div>
                <router-link to="/"><img src="https://via.placeholder.com/120x60" alt="로고"></router-link>
            </div>
            <div class="hidden lg:flex justify-between basis-2/3 items-center">
                <ul class="flex basis-2/3 justify-between">
                    <li v-for="(e,index) in NavList[0]" :key="e" class="relative basis-1/4 text-center" @mouseout="NavSelectIndex = null" @mouseover="NavSelectIndex = index; SubMenu(index)" :class="NavSelectIndex === index && 'font-bold'"><router-link :to="NavList[1][index]" class="text-base hover:font-bold">{{ e }}<font-awesome-icon icon="chevron-down" class="transition-all duration-500 text-xs align-baseline" :class="NavSelectIndex === index && 'rotate-180'" /></router-link>
                        <ul class="absolute w-36 bg-slate-800 h-0 overflow-hidden transition-all duration-500 sub_list" :style="NavSelectIndex === index && isSubMenu">
                            <li v-for="(el,i) in SubList[index]" :key="el" class="h-[44px] pt-2 items-center"><router-link :to="SubMenuLink[index][i]" class="text-sm text-white/90 font-medium hover:font-bold">{{ el }}</router-link></li>
                        </ul>
                    </li>
                </ul>
                <ul class="flex gap-x-5">
                    <li v-if="!$store.state.loginChk"><router-link to="/login" class="text-sm"> <font-awesome-icon icon="lock" /> 로그인</router-link></li>
                    <li v-else><router-link to="/" class="text-sm" @click="logOut"><font-awesome-icon icon="arrow-right-from-bracket" />로그아웃</router-link></li>
                    <li><router-link to="/member" class="text-sm"><font-awesome-icon icon="user" />회원가입</router-link></li>
                </ul>
            </div>
        </div>
        <div class="absolute right-4 md:right-8 top-6 duration-1000 transition-all z-50 cursor-pointer lg:hidden" @click="isOpen = !isOpen" :class="isOpen === true && 'on'">
        <div v-for="e in 3" :key="e" class="w-[30px] h-0.5 bg-black rounded m-1.5 transition-all duration-1000"></div>
        </div>
    <div class="w-80 h-full fixed bg-gray-50 z-40 p-12 box-border transition-all duration-500 top-0 lg:hidden overflow-y-scroll" :class="isOpen ? 'right-0':'-right-80'">
        <ul class="mt-12">
            <li class="py-5 border-b relative cursor-pointer font-bold" v-for="(e,index) in NavList[0]" :key="e" @click="NavSelectIndex = index; SubMenu(index)">{{ e }}<font-awesome-icon icon="chevron-down" class="transition-all duration-500 text-sx align-baseline absolute right-5 top-6" :class="NavSelectIndex === index && 'RotateClass'"/>
                <template v-for="(e,i) in SubList" :key="e" >
                    <ul v-if="index === i" class="flex flex-wrap justify-between sub_list overflow-hidden transition-all duration-300" style="height: 0px;" :style="NavSelectIndex === index && `height:${subHeight}`">
                        <li v-for="(el,ind) in e" :key="el" class="basis-full text-xs hover:text-[#37a2d7]"><router-link :to="SubMenuLink[i][ind]" class="first-of-type:pt-5 pt-2 pl-5 inline-block w-full" @click="isOpen =false">{{ el }}</router-link></li>
                    </ul>
                </template>
            </li>
        </ul>
    </div>
    </div>
</template>
<script>
import {auth} from '../firebase'
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import data from '../assets/Data.json'
export default {
    name: "NaviCom",
    data() {
        return {
            NavList: data.Nav,
            SubList: data.SubMenu,
            SubMenuLink: data.SubMenuLink,
            NavSelectIndex : null,
            isOpen : false,
            subHeight: '0px',
            RotateClass: '',
            windowWidth: 0
        };
    },
    methods: {
        windowUpdateWidth(){
            this.windowWidth = window.innerWidth;
        },
        SubMenu(e){
                const list = document.querySelectorAll(".sub_list")[e];
                const length = list.querySelectorAll("li").length;
                this.isSubMenu = `height:${length*44}px`;

                if(list.style.height === '0px'){
                    list.style.height = `${length*40}px`;
                    this.RotateClass = 'rotate-180';
                }else{
                    list.style.height = '0px';
                    this.RotateClass = ''
                }
                this.subHeight = list.style.height;
        },
        logOut(){
            auth.signOut();
            this.$store.commit("logOutToken")
        }
    },
    watch:{
        windowWidth(e){
            if(e<1024){
                this.NavSelectIndex = null ;
                this.isOpen = false;
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.windowUpdateWidth)
        // mount되었을 때 윈도우 이벤트 추가 : 만약 사이즈가 변경되면 메소드 내 이벤트를 실행
    },
    components: { faFontAwesome }
}
</script>
<style >
    .on div:nth-child(1){transform: translateY(8px) rotate(45deg);}
    .on div:nth-child(2){opacity: 0; transform: translateX(-30px);}
    .on div:nth-child(3){transform: translateY(-8px) rotate(-45deg);}
</style>