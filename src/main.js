import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./index.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faChevronDown, faBuilding, faHistory, faPaperPlane, faMedal, faLock, faUser, faArrowRightFromBracket, faCircleArrowUp, faDesktop, faComment, faTaxi, faMobile, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import VueNumber from 'vue-number-animation'

library.add(faChevronDown, faBuilding, faHistory, faPaperPlane, faMedal, faLock, faUser, faArrowRightFromBracket, faCircleArrowUp, faDesktop, faComment, faTaxi, faMobile, faThumbsUp, faThumbsDown)
VueNumber
createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(VueNumber).use(store).use(router).mount('#app')
