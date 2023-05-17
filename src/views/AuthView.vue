<template>
    <div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name:"AuthView",
    data() {
        return {
            code:this.$route.query.code,
            client_secret: '5HN8v9dRioCqq499WR99lgGztL1v3Rcv',
            client_id : 'f413cf9c5dfda34cfb26681d32ac586d',
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:8080/templatehome/auth'
        }
    },
    mounted() {
        axios.get("https://kauth.kakao.com/oauth/token",{
            params:{
                code:this.code,
                grant_type: this.grant_type,
                redirect_uri:this.redirect_uri,
                client_id:this.client_id,
                client_secret:this.client_secret
            }
        }).then((res)=>{
            this.$store.commit("kakaoLogin",{res})
            sessionStorage.setItem("refreshToken",res.data.access_token)
            window.Kakao.init('4087fbcbb6e717750dbff159db53fdea');
                    window.Kakao.API.request({
                        url: '/v2/user/me',
                        data: {
                            property_keys: [
                            "kakao_account.profile",
                            "kakao_account.email"
                            ]
                        },
                        success: ((res)=>{
                            console.log(res)
                            sessionStorage.setItem("displayName",res.kakao_account.profile.nickname)
                            sessionStorage.setItem("uid", res.id)
                            this.$store.commit("loginState",{refreshToken: this.$store.state.loginToken, displayName:sessionStorage.getItem("displayName"), uid:sessionStorage.getItem("uid")})
                        }),
                        fail: ((err)=>{
                            console.log(err)
                        })
                    })
                    this.$router.replace("/");
              
          
        })
    },
}
</script>
<style>
    
</style>