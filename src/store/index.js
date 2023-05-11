import { createStore } from 'vuex'

export default createStore({
  state(){
    return {
      number:0,
      stock:1000,
      loginChk: false,
      displayName:"",
      loginToken:null,
      noticeId:0,
      galleryId:0,
      qnaId:0,
      uid:""
    }
    //모든 영역?에서 쓸 수 있는 data변수같은거임. $store.state.number 식으로 가져가서 쓸수있다
  },
  mutations: {
    NumberPlus(state){
      state.number++;
      // this.number가 아니라 state.number로 쓰는거임
    },
    NumberMinus(state){
      state.stock--;
      // this.number가 아니라 state.number로 쓰는거임
    },
    //모든 영역?에서 쓸 수 있는 method같은거임. $store.commit('NumberPlus') 식으로 가져가서 쓸수있다
    //이걸로 login 상태 같은 거 관리한다.
    loginToken(state,payload){
      state.loginToken = payload.refreshToken; // 받은 값(payload)를 loginToken에 넣음
      state.uld = payload.uid
      state.loginChk = true; // loginChk값을 true로 변경한다.
    },
    logOutToken(state){
      state.loginToken = null;
      state.loginChk = false;
      state.displayName = "";
      state.uid = '';
      sessionStorage.removeItem("refreshToken")
      sessionStorage.removeItem("displayName")
    },
    loginState(state,payload){
      state.loginToken = sessionStorage.getItem("refreshToken")
      state.uid = payload.uid
      state.displayName = payload.displayName
      state.loginChk = true
    },
    NoticeRead(state,payload){
      state.noticeId = payload
    },
    GalleryRead(state,payload){
      state.galleryId = payload
    },
    QnaRead(state,payload){
      state.qnaId = payload
    }
  },
  actions: {
  },
})
