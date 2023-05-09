<template lang="">
    <div>
        <swiper class="h-auto sm:h-[640px]" effect="fade" :modules="Modules" :autoplay="true && {delay:3000}" :loop="true" :navigation="{prevEl:'.swiper-button-prev', nextEl:'.swiper-button-next'}" :pagination="{type:'fraction'}" @slideChange="onSlideChange">
            <swiper-slide v-for="(e, index) in 5" :key="index" class="relative"><img :src="require(`@/assets/images/banner-${index+1}.png`)" :alt="e" class="w-full h-full">
                <div class="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white">
                    <h3 class="text-base sm:text-3xl lg:text-5xl wow animate__fadeInDown text-center" data-wow-duration="1s">비주얼 제목 {{index+1}}</h3>
                    <p class="wow animate__fadeInUp text-sm sm:text-xl lg:text-2xl text-center font-bold mt-4" data-wow-duration="1s">설명이 들어가는 곳입니다.</p>
                    <p class="wow animate__fadeInUp text-sm sm:text-xl lg:text-2xl text-center font-bold" data-wow-duration="1s">추가로 할 설명이 있다면 여기 들어갑니다.</p>
                    <router-link to="/" data-wow-duration="1s" class="bg-slate-400 px-10 py-2 block text-center mx-auto w-32 mt-4 rounded-lg wow animate__fadeInUp text-sm lg:text-base">More</router-link>
                </div>
            </swiper-slide>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </swiper>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
// import { Swiper, SwiperSlide } from 'swiper/types/swiper-events';
import {Navigation, EffectFade, Autoplay, Pagination} from 'swiper';
import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import WOW from 'wowjs';
import 'animate.css';
export default {
    name: "HomeBanner",
    data() {
        return {
            Modules : [Navigation, EffectFade, Pagination, Autoplay]
        }
    },
    components:{
        Swiper,
        SwiperSlide
    },
    mounted() {
        new WOW.WOW({
            boxClass: "wow",
            animateClass: "animate__animated",
            live:false,
            mobile:true
        }).init();
    },  
    methods: {
        onSlideChange(){
            new WOW.WOW({
                live:false
            }).init();
        }
    }, 
}
</script>
<style>
    .swiper-pagination.swiper-pagination-fraction{
        background-color: rgba(255, 255, 255,0.5);
        width:auto;
        left:50%;
        transform: translateX(-50%);
        padding: 2px 35px;
        letter-spacing: 3px;
        border-radius: 20px;
        font-weight: bold;
    }
    @media screen and (max-width:1024px) {
        .swiper-pagination.swiper-pagination-fraction,
        .swiper-pagination.swiper-pagination-fraction span{font-size:14px}
    }
    @media screen and (max-width:640px) {
        .swiper-pagination.swiper-pagination-fraction,
        .swiper-pagination.swiper-pagination-fraction span{font-size:10px}
        .swiper-button-next::after,
        .swiper-button-prev::after{font-size: 14px;}
    }
    .swiper-button-next::after,
    .swiper-button-prev::after{color:white}
</style>